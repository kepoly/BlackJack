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
            templateUrl: 'views/modals/register.php',
            controller: ModalInstanceCtrl
        });

        modalInstance.result.then(function (selectedItem) {
            $rootScope.selected = selectedItem;
        });
    };


});


app.controller('listCtrl', ['$scope', function ($scope) {


    $scope.cards = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
    $scope.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    $scope.numOfDecks = 1;

    $scope.playersDone = 0;
    $scope.dealersGo = 0;

    $scope.aceCheck = 0;
    $scope.betChange = 0;
    $scope.betAmount = 10;
    $scope.startingBalance = 1000;


    $scope.playersCards = [];
    $scope.dealersCards = [];

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

    $scope.startCards = function() {
        //let's get a new deck of cards
        var preparedCards = $scope.shuffleCards($scope.newDeck());
        return preparedCards;
    }

    $scope.start = $scope.startCards();

    $scope.dealNextCard = function() {
        $scope.cardsTaken = 0;
        var nextCard = $scope.start[$scope.cardsTaken];

        console.log($scope.start[0]);
        $scope.start.splice(0,1);
        return nextCard;

    }

    $scope.getHandSum = function(handArray) {
        var finalHandSum = 0;
        var numAces = 0;
        var cardNum;

        for(i = 0; i < handArray.length; i++) {

            cardNum = handArray[i].number;

            if(cardNum == 1) {
                numAces++;
                finalHandSum += 11;
            } else if(cardNum > 10) {
                finalHandSum += 10;
            } else {
                finalHandSum += cardNum;
            }

        }

        while(finalHandSum > 21 && numAces > 0) {
            finalHandSum -= 10;
            numAces--;
        }

        return finalHandSum;
    }

    $scope.returnHand = function(handToReturn) {

        var areadableHand = {};
        var cardValue;
        var cardSuit;
        var imageLink;

        for(i = 0; i < handToReturn.length; i++) {

            cardValue = $scope.returnCardName(handToReturn[i].number);

            cardSuit = $scope.returnCardSuit(handToReturn[i].suit);

            areadableHand[i] = {"name": "Hidden", "suit": "Hidden", "image": "back_of_card"};

            if($scope.dealersGo == 0 && i == 1 && $scope.playersDone == 0) {
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

    $scope.stand = function() {
        //$scope.dealersGo = 0;
        //$scope.dealersShownCards = $scope.returnHand($scope.dealersCards);
    }

    //if dealersgo is set to 0 and i is 1 and playersDone is set to 0

    $scope.playersCards[0] = $scope.dealNextCard();
    $scope.dealersCards[0] = $scope.dealNextCard();
    $scope.playersCards[1] = $scope.dealNextCard();
    $scope.dealersCards[1] = $scope.dealNextCard();

    $scope.dealersGo = 1;
    $scope.playersShownCards = $scope.returnHand($scope.playersCards);

    $scope.dealersGo = 0;
    $scope.dealersShownCards = $scope.returnHand($scope.dealersCards);




    console.log($scope.returnHand($scope.playersCards));


    $scope.hitForCard = function(playerName) {
        console.log(playerName);
        var newIndex0 = $scope.playersCards.length;
        var newIndex1 = $scope.dealersCards.length;
        console.log(newIndex0);

        if(playerName == "Player") {
            $scope.dealersGo = 1;
            $scope.playersCards[newIndex0] = $scope.dealNextCard();
            console.log($scope.returnHand($scope.playersCards));

            $scope.playersShownCards = $scope.returnHand($scope.playersCards);
            $scope.dealersGo = 0;

        } else if(playerName == "Dealer") {

            $scope.dealersCards[newIndex1] = $scope.dealNextCard();

            $scope.dealersShownCards = $scope.returnHand($scope.dealersCards);

        }

    }


}]);


app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                title: 'Home',
                templateUrl: 'views/home.php',
                controller: 'listCtrl'
            })

            .when('/edit-post/:postID', {
                title: 'Edit Posts',
                templateUrl: 'views/edit-post.php',
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