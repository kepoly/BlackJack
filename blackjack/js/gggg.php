//Each and every user who visits the site is assigned a guest number unless they are signed in
//this unique name or guest number gets pushed here as user_name and we handle the notifications here
$scope.goLive = function (user_name) {
var refu = new Firebase("https://gcon.firebaseio.com/");
$scope.pastMsg = '';
$scope.counter = 0;
refu.authAnonymously(function (error, authData) {
var checkNotes = refu.child('notifications');
checkNotes.child(user_name).on('value', function (dataSnapshot) {

var dataKeyShot = dataSnapshot.key();
var dataSnapShot = dataSnapshot.val();

$scope.changingMessage = $firebaseArray(checkNotes);
if (dataSnapShot == null) {
$scope.changingMessage = 'You dont have any alerts please stand by';
} else {
$scope.changingMessage = dataSnapShot[dataKeyShot];
}

if ($scope.pastMsg === $scope.changingMessage) {
$scope.counter = $scope.counter + 1;
} else {
$scope.counter = 0;
}

if ($scope.counter === 0) {
$scope.changeBackgroundText = 'black';
}
else if ($scope.counter % 2 === 0) {
$scope.changeBackgroundText = 'tomato';
} else {
$scope.changeBackgroundText = 'yellow';
}

$scope.pastMsg = $scope.changingMessage;
console.log($scope.changingMessage);
});
$scope.changingMessage = $scope.changingMessage;
$scope.changeBackground = "url('assets/img/bg.png') repeat";

});
}