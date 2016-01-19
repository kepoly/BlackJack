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

app.filter('sumByArray', function() {
    return function(data) {
        if (data.length == 0) {
            return 0;
        }

        var sum = 0;
        for(var i = 0; i < data.length; i++) {
            sum += data[i];
        }

        return sum;
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

    $scope.deck = {};
    $scope.playersHits = [];
    $scope.dealersHits = [];
    $scope.playersHitCards = [];
    $scope.playersHitCardsValues = [];
    $scope.playersTotal = 0;
    $scope.aceCheck = 0;

    $scope.betChange = 0;

    $scope.betAmount = 10;
    $scope.startingBalance = 1000;

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
                if($scope.aceCheck < 11) {
                    $scope.returnVal = 11;
                } else {
                    $scope.returnVal = 1;
                }
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

        //there is 13 possible cards ace through king (number)
        //there is 4 possible suits hearts through spades($scope.suits contains the order)
        //we are going to create 13 cards x 4 and 4 suits x 13.
        //1,1 2,2 3,3 4,4 5,1 6,2 7,3 8,4 9,1 and so on.
        for (i = 0; i < 52; i++) {
            suit = i % 4 + 1;
            number = i % 13 + 1;
            $scope.deck[i + 1] = {"number": number, "suit": suit};

        }
        return $scope.deck;
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
        $scope.preparedCards = $scope.newDeck();

        //let's shuffle that deck we got from above
        //returns deck as an array.
        $scope.finalCards = $scope.shuffleCards($scope.preparedCards);

        //We are going to work with objects not arrays so we can use the returnObject method
        //returns deck as an object
        $scope.finalCards = $scope.returnObject($scope.finalCards);
    }

    $scope.startCards();


    //The start game function, let's get the first two cards for each player.
    //dealersFirst dealersSecond playersFirst playersSecond
    //there is some checking to make sure the same card is not selected since this is only ONE deck.
    //in the future this will NEED to be optimized for largers decks but it basically picks two random numbers for each
    //players between 0-51 and then returns the value, and name/suit of the card.
    $scope.firstFour = function () {

        $scope.dealersFirst = Math.floor(Math.random() * (51 - 0 + 1)) + 0;
        $scope.dealersSecond = Math.floor(Math.random() * (51 - 0 + 1)) + 0;

        while ($scope.dealersFirst == $scope.dealersSecond) {
            $scope.dealersSecond = Math.floor(Math.random() * (51 - 0 + 1)) + 0;
        }

        $scope.playersFirst = Math.floor(Math.random() * (51 - 0 + 1)) + 0;
        $scope.playersSecond = Math.floor(Math.random() * (51 - 0 + 1)) + 0;

        while ($scope.playersFirst == $scope.dealersFirst || $scope.playersFirst == $scope.dealersSecond) {
            $scope.playersFirst = Math.floor(Math.random() * (51 - 0 + 1)) + 0;
        }

        while ($scope.playersSecond == $scope.dealersFirst || $scope.playersSecond == $scope.dealersSecond || $scope.playersSecond == $scope.playersFirst) {
            $scope.playersSecond = Math.floor(Math.random() * (51 - 0 + 1)) + 0;
        }

        //Gets the players first four card and return them as an array, let's also initialize the checkFirstFour to be used later.
        $scope.firstFourCards = {}


        $scope.firstFourCards["dealersFirst"] = $scope.dealersFirst;
        $scope.firstFourCards["dealersSecond"] = $scope.dealersSecond;
        $scope.firstFourCards["playersFirst"] = $scope.playersFirst;
        $scope.firstFourCards["playersSecond"] = $scope.playersSecond;


        $scope.checkFirstFour = [$scope.dealersFirst, $scope.dealersSecond, $scope.playersFirst, $scope.playersSecond];

        return $scope.firstFourCards;

    }

    //We are going to process the first four cards and return the data to show the cards and their values.
    $scope.processFirstFour = function(checkCards) {
        $scope.checkCards = checkCards;
        $scope.dealersFirstCheck = $scope.checkCards['dealersFirst'];
        $scope.dealersSecondCheck = $scope.checkCards['dealersSecond'];

        $scope.dealersCard1 = $scope.returnCardName($scope.finalCards[$scope.dealersFirstCheck].number) + "_of_" +
            $scope.returnCardSuit($scope.finalCards[$scope.dealersFirstCheck].suit);
        $scope.dealersCard1Value = $scope.returnCardValue($scope.finalCards[$scope.dealersFirstCheck].number);

        $scope.dealersCard2 = "back_of_card";

        //returns the results of startGame to be displayed.
        //we get the first four cards here. The dealers SECOND needs to not be shown or hidden.
        $scope.playersFirstCheck = $scope.checkCards['playersFirst'];
        $scope.playersSecondCheck = $scope.checkCards['playersSecond'];

        console.log($scope.playersFirstCheck);

        $scope.playersCard1 = $scope.returnCardName($scope.finalCards[$scope.playersFirstCheck].number) + "_of_" +
            $scope.returnCardSuit($scope.finalCards[$scope.playersFirstCheck].suit);
        $scope.playersCard1Value = $scope.returnCardValue($scope.finalCards[$scope.playersFirstCheck].number);

        $scope.playersCard2 = $scope.returnCardName($scope.finalCards[$scope.playersSecondCheck].number) + "_of_" +
            $scope.returnCardSuit($scope.finalCards[$scope.playersSecondCheck].suit);
        $scope.playersCard2Value = $scope.returnCardValue($scope.finalCards[$scope.playersSecondCheck].number);

    }

    //The players Hits, we need to check for several things before we can spit out a new card.
    //Has the card been pulled?
    $scope.playerHits = function() {



        if($scope.playersCard2Value == 11 && $scope.playersTotal > 21){
            $scope.playersCard2Value = 1;
        }

        $scope.playerHitCard = Math.floor(Math.random() * (51 - 0 + 1)) + 0;

        while($scope.checkFirstFour.indexOf($scope.playerHitCard) != -1 || $scope.playersHits.indexOf($scope.playerHitCard) != -1){

            $scope.playerHitCard = Math.floor(Math.random() * (51 - 0 + 1)) + 0;

        }

        //this is a switch to check for a cards value(ace)
        //if the players total is greater than 10 ie >11
        //lets set the switch above 11 since you can't have 22 in BJ
        if($scope.playersTotal > 10) {
            $scope.aceCheck = 12;
            console.log($scope.aceCheck);
        }

        $scope.playersHits.push($scope.playerHitCard);

        for(var i = 0; i < $scope.playersHits.length; i++) {
            $scope.playersHitCards[i] = $scope.returnCardName($scope.finalCards[$scope.playersHits[i]].number) + "_of_" +
                $scope.returnCardSuit($scope.finalCards[$scope.playersHits[i]].suit);
        }

        for(var j = 0; j < $scope.playersHits.length; j++) {
            $scope.playersHitCardsValues[j] = $scope.returnCardValue($scope.finalCards[$scope.playersHits[j]].number);
        }



        $scope.playersTotal += $scope.returnCardValue($scope.finalCards[$scope.playerHitCard].number);

        if($scope.playersCard1Value == 11 && $scope.playersTotal > 21){
            $scope.playersTotal -= 11;
            $scope.playersTotal += 1;
            $scope.playersCard1Value = 1;
        }

        if($scope.playersCard2Value == 11 && $scope.playersTotal > 21){
            $scope.playersTotal -= 11;
            $scope.playersTotal += 1;
            $scope.playersCard2Value = 1;
        }

        $scope.totalCounter($scope.playersTotal);
        return $scope.playersHits;

    }

    $scope.doDealer = function() {

        $scope.dealersCard2 = $scope.returnCardName($scope.finalCards[$scope.dealersSecondCheck].number) + "_of_" +
            $scope.returnCardSuit($scope.finalCards[$scope.dealersSecondCheck].suit);
        $scope.dealersCard2Value = $scope.returnCardValue($scope.finalCards[$scope.dealersSecondCheck].number);

    }

    $scope.anotherGame = function() {

        $scope.playersHits = [];
        $scope.dealersHits = [];
        $scope.playersHitCards = [];
        $scope.playersHitCardsValues = [];
        $scope.buttonDisabled = 0;

        $scope.startingBalance = $scope.startingBalance;
        $scope.startCards();

        $scope.startingBalance -= $scope.betAmount;

        $scope.checkCards = $scope.firstFour();

        $scope.processFirstFour($scope.checkCards);



    }


    $scope.betAndStart = function() {

        $scope.totalCounter = function(total) {

            if(total > 21) {
                $scope.buttonDisabled = 1;

                $scope.message = "Game Over";
            } else if(total === 21) {
                $scope.buttonDisabled = 1;
                $scope.message = "BlackJack";
            }

        }
        //returns the results of startGame to be displayed.
        //we get the first four cards here. The dealers SECOND needs to not be shown or hidden.

        $scope.startingBalance -= $scope.betAmount;

        $scope.checkCards = $scope.firstFour();

        $scope.processFirstFour($scope.checkCards);

        $scope.playersTotal = $scope.playersCard1Value + $scope.playersCard2Value;
        $scope.totalCounter($scope.playersTotal);
    }


    function add(a, b) {
        return a + b;
    }

    $scope.hitsSum = $scope.playersHitCardsValues.reduce(add, 0);




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