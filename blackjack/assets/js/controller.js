var app = angular.module('myAppGames', ['ui.bootstrap', 'ngRoute']);

app.factory("services", ['$http', function ($http) {
    var serviceBase = 'api/services/';
    var obj = {};
    obj.getPost = function (postID) {
        return $http.get(serviceBase + 'post?id=' + postID);
    }

    return obj;
}]);


app.filter('num', function () {
    return function (input) {
        return parseInt(input, 10);
    };
});


app.run(function (services, $route, $routeParams, $rootScope, $http, $location, $uibModal) {

    $rootScope.openRegister = function () {

        var modalInstance = $uibModal.open({
            templateUrl: 'src/views/modals/register.php',
            controller: ModalInstanceCtrl
        });

        modalInstance.result.then(function (selectedItem) {
            $rootScope.selected = selectedItem;
        });
    };


});


app.controller('listCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

    //These are not currently being used but it's a good visualization of what the Card deck looks like.
    //As well we are keeping the order of the cards Hearts Diamonds Clubs Spades to Mix them Up more than a normal Deck.
    $scope.cards = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
    $scope.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

    //Allows you to set the number of decks to be played with.
    //Should be a whole Number since this is blackjack and not something like euchre.
    $scope.numOfDecks = 4;

    //Boolen to check if the player is done his hand.
    $scope.playersDone = 0;

    //Boolean to check if its the dealers time to go, It is different from the above since we use it to
    // hide the dealers first Card.
    $scope.dealersGo = 0;

    //Counter to see how many aces are currently in a hand.
    $scope.aceCheck = 0;

    //I have to check and see if this is being used.
    $scope.betChange = 0;

    //Allows you/the user to set the amount to bet for each hand. Maybe add some chips and a method to show them.
    $scope.betAmount = 10;

    //The Starting Balance. We can impelment this server side if we want it to persist. Since this is just for fun.
    //We can leave it on the client for now. There is several options for this ie: DB, firebase, nosql, files, sessions etc.
    $scope.startingBalance = 1000;

    //The players/dealers hand decleration that holds the actual cards in his hand(the cards are objects)
    $scope.playersCards = [];
    $scope.dealersCards = [];

    //each suit is numbered from 1-4 return the corresponding suit from cardValue.
    $scope.returnCardSuit = function (cardValue) {
        switch (cardValue) {
            case 1:
                $scope.returnVal = 'hearts';
                break;
            case 2:
                $scope.returnVal = 'diamonds';
                break;
            case 3:
                $scope.returnVal = 'clubs';
                break;
            case 4:
                $scope.returnVal = 'spades';
                break;
            default:
                $scope.returnVal = '';
        }

        return $scope.returnVal;
    }

    //Return the value of the card being passed in. ace is 1, 10 is jack, 11 queen, 12 king, default 11
    $scope.returnCardValue = function (cardValue) {
        switch (cardValue) {
            case 1:
                $scope.returnVal = 1;
                break;
            case 2:
                $scope.returnVal = 2;
                break;
            case 3:
                $scope.returnVal = 3;
                break;
            case 4:
                $scope.returnVal = 4;
                break;
            case 5:
                $scope.returnVal = 5;
                break;
            case 6:
                $scope.returnVal = 6;
                break;
            case 7:
                $scope.returnVal = 7;
                break;
            case 8:
                $scope.returnVal = 8;
                break;
            case 9:
                $scope.returnVal = 9;
                break;
            case 10:
                $scope.returnVal = 10;
                break;
            case 11:
                $scope.returnVal = 10;
                break;
            case 12:
                $scope.returnVal = 10;
                break;
            case 13:
                $scope.returnVal = 10;
                break;
            default:
                $scope.returnVal = 11;
        }

        return $scope.returnVal;
    }

    //Return the Card name like above but return the actual string value to be shown to the user and processed
    //to create the image link.
    $scope.returnCardName = function (cardValue) {

        switch (cardValue) {
            case 1:
                $scope.returnVal = 'ace';
                break;
            case 2:
                $scope.returnVal = 'two';
                break;
            case 3:
                $scope.returnVal = 'three';
                break;
            case 4:
                $scope.returnVal = 'four';
                break;
            case 5:
                $scope.returnVal = 'five';
                break;
            case 6:
                $scope.returnVal = 'six';
                break;
            case 7:
                $scope.returnVal = 'seven';
                break;
            case 8:
                $scope.returnVal = 'eight';
                break;
            case 9:
                $scope.returnVal = 'nine';
                break;
            case 10:
                $scope.returnVal = 'ten';
                break;
            case 11:
                $scope.returnVal = 'jack';
                break;
            case 12:
                $scope.returnVal = 'queen';
                break;
            case 13:
                $scope.returnVal = 'king';
                break;
            default:
                $scope.returnVal = 'ace';
        }

        return $scope.returnVal;

    }

    //Creating a new deck, can be called by itself or shuffled like shown below.
    $scope.newDeck = function () {
        var suit;
        var number;
        var deck = {};
        //there is 13 possible cards ace through king (number)
        //there is 4 possible suits hearts through spades($scope.suits contains the order)
        //we are going to create 13 cards x 4 and 4 suits x 13.
        //1,1 2,2 3,3 4,4 5,1 6,2 7,3 8,4 9,1 and so on.
        for (i = 0; i <= (51 * $scope.numOfDecks); i++) {
            suit = i % 4 + 1;
            number = i % 13 + 1;
            deck[i + 1] = {"number": number, "suit": suit};

        }
        return deck;
    }

    //let's shuffle the order of each object(cards) in the parent object(deck)
    //using ________ universal method.
    $scope.shuffleCards = function (myArray) {

        var myArray = Object.keys(myArray).map(function (k) {
            return myArray[k]
        });
        var i = myArray.length;

        if (i == 0) return false;
        while (--i) {
            var j = Math.floor(Math.random() * ( i + 1 ));
            var tempi = myArray[i];
            var tempj = myArray[j];
            myArray[i] = tempj;
            myArray[j] = tempi;
        }

        return myArray;
    }

    //return an object from an array
    $scope.returnObject = function (arr) {
        var rv = {};
        for (var i = 0; i < arr.length; ++i)
            rv[i] = arr[i];
        return rv;
    }

    $scope.startCards = function () {
        //let's get a new deck of cards
        var preparedCards = $scope.shuffleCards($scope.newDeck());
        return preparedCards;
    }

    $scope.start = $scope.startCards();

    $scope.dealNextCard = function () {
        $scope.cardsTaken = 0;
        var nextCard = $scope.start[$scope.cardsTaken];

        console.log($scope.start[0]);
        $scope.start.splice(0, 1);
        return nextCard;

    }

    $scope.getHandSum = function (handArray) {
        var finalHandSum = 0;
        var numAces = 0;
        var cardNum;

        for (i = 0; i < handArray.length; i++) {

            cardNum = handArray[i].number;

            if (cardNum == 1) {
                numAces++;
                finalHandSum += 11;
            } else if (cardNum > 10) {
                finalHandSum += 10;
            } else {
                finalHandSum += cardNum;
            }

        }

        while (finalHandSum > 21 && numAces > 0) {
            finalHandSum -= 10;
            numAces--;
        }

        return finalHandSum;
    }

    $scope.returnHand = function (handToReturn) {

        var areadableHand = {};
        var cardValue;
        var cardSuit;
        var imageLink;

        for (i = 0; i < handToReturn.length; i++) {

            cardValue = $scope.returnCardName(handToReturn[i].number);

            cardSuit = $scope.returnCardSuit(handToReturn[i].suit);

            areadableHand[i] = {"name": "Hidden", "suit": "Hidden", "image": "back_of_card"};

            if ($scope.dealersGo == 0 && i == 1 && $scope.playersDone == 0) {
                areadableHand[i] = {"name": "default", "suit": "default", "image": "back_of_card"};
            } else {
                areadableHand[i]["name"] = cardValue;
                areadableHand[i]['suit'] = cardSuit;

                imageLink = cardValue + "_of_" + cardSuit;
                areadableHand[i]['image'] = imageLink;
            }


        }

        return areadableHand;

    }

    $scope.checkWinner = function (playerCards, dealerCards) {

        var playerOne = playerCards;
        var dealerOne = dealerCards;
        var playerOneValue;
        var dealerOneValue;

        playerOneValue = $scope.getHandSum(playerOne);
        dealerOneValue = $scope.getHandSum(dealerOne);

        if (playerOneValue > 21) {
            $scope.message = "Game Over - Player Over 21";
        } else if (playerOneValue == 21 && dealerOneValue < 21 && $scope.playersCards.length == 2) {
            $scope.message = "Player Wins - BlackJack 21";
            $scope.startingBalance += $scope.betAmount * 2.5;
        } else if (dealerOneValue == 21 && playerOneValue < 21) {
            $scope.message = "Dealer Wins - BlackJack 21";
        } else if (dealerOneValue > 21) {
            $scope.message = "Player Wins - Dealer Over 21";
            $scope.startingBalance += $scope.betAmount * 2;
        } else if (playerOneValue == dealerOneValue) {
            $scope.message = "Push - Player and Dealer Cards Equal";
            $scope.startingBalance += $scope.betAmount;
        } else if (dealerOneValue > playerOneValue && dealerOneValue <= 21 && $scope.dealersGo == 1) {
            $scope.message = "Dealer Wins - Cards more than player";
        } else if (playerOneValue > dealerOneValue && dealerOneValue >= 17 && $scope.dealersGo == 1) {
            $scope.message = "Player Wins - Cards more than dealer";
            $scope.startingBalance += $scope.betAmount * 2;
        } else {
            $scope.message = "Hit or Stay ?";
        }

    }

    $scope.hitForCard = function (playerName) {

        var newIndex0 = $scope.playersCards.length;
        var newIndex1 = $scope.dealersCards.length;
        var checkDealersTotal;
        var checkPlayersTotal;

        if ($scope.start.length < 1) {
            $scope.message = "The Deck has Been Depleted, Please Request a new Deck.";
        }


        if (playerName == "Player") {

            $scope.dealersGo = 1; //ensure second card is not seen
            $scope.playersCards[newIndex0] = $scope.dealNextCard();

            $scope.playersShownCards = $scope.returnHand($scope.playersCards);
            $scope.dealersGo = 0; //reset to check for next card.
            $scope.showPlayerTotal = $scope.getHandSum($scope.playersCards);

        } else if (playerName == "Dealer") {

            $scope.dealersCards[newIndex1] = $scope.dealNextCard();

            $scope.dealersShownCards = $scope.returnHand($scope.dealersCards);


        }

        checkDealersTotal = $scope.getHandSum($scope.dealersCards);
        checkPlayersTotal = $scope.getHandSum($scope.playersCards);

        if (checkDealersTotal < 17 && checkPlayersTotal < 21 && playerName == "Dealer") {
            $scope.dealersTurn(checkDealersTotal);
        }

        $scope.checkWinner($scope.playersCards, $scope.dealersCards);

        console.log("Dealers HIT Total: " + checkDealersTotal);

    }

    $scope.stand = function () {
        var checkDealersValue;
        $scope.dealersGo = 1;
        $scope.dealersShownCards = $scope.returnHand($scope.dealersCards);

        checkDealersValue = $scope.getHandSum($scope.dealersCards);

        if (checkDealersValue < 17) {
            $scope.dealersTurn(checkDealersValue);
        } else {
            $scope.checkWinner($scope.playersCards, $scope.dealersCards);
        }

    }

    $scope.dealersTurn = function (dealersCount) {

        console.log("Dealers turn count: " + dealersCount);
        if (dealersCount < 17) {

            $timeout(function () {

                $scope.hitForCard("Dealer");

            }, 1000);

        }

    }

    $scope.getNewDeck = function () {

        $scope.start = $scope.startCards();
    }


    $scope.startGame = function () {
        //if dealersgo is set to 0 and i is 1 and playersDone is set to 0


        $scope.playersCards = [];
        $scope.dealersCards = [];
        $scope.message = "";

        var balance;
        var bet;
        balance = $scope.startingBalance;
        bet = $scope.betAmount;

        if ($scope.start.length <= 8) {
            $scope.message = "Please Request a New Deck the Cards are Depleted.";
        } else {

            $scope.startingBalance -= bet;

            $scope.playersCards[0] = $scope.dealNextCard();
            $scope.dealersCards[0] = $scope.dealNextCard();
            $scope.playersCards[1] = $scope.dealNextCard();
            $scope.dealersCards[1] = $scope.dealNextCard();

            $scope.dealersGo = 1;
            $scope.playersShownCards = $scope.returnHand($scope.playersCards);

            $scope.dealersGo = 0;
            $scope.dealersShownCards = $scope.returnHand($scope.dealersCards);

            $scope.showPlayerTotal = $scope.getHandSum($scope.playersCards);
            $scope.checkWinner($scope.playersCards, $scope.dealersCards);

            console.log($scope.start.length);


        }


    }


}]);


app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                title: 'Home',
                templateUrl: 'src/views/home.php',
                controller: 'listCtrl'
            })

            .when('/edit-post/:postID', {
                title: 'Edit Posts',
                templateUrl: 'src/views/edit-post.php',
                controller: 'editCtrl',
                resolve: {
                    post: function (services, $route) {
                        var postID = $route.current.params.postID;
                        return services.getPost(postID);
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });

        if (window.history && window.history.pushState) {

            $locationProvider.html5Mode(true);
        }
    }
]);