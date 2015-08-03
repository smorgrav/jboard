// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('jboard', ['johans.services', 'ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.controller('ImageCtrl', function($scope, $cordovaMedia, $ionicLoading, MediaService, BoardService) {
    $scope.onTap = function(r,c) {
        console.log("Tapped: " + r + ":" + c);
        $scope.play("audio/test.wav")
    };

    $scope.rows = 3;
    $scope.cols = 3;
    $scope.repeat = function(i) {
        return i?$scope.repeat(i-1).concat(i):[]
    }

    $scope.play = function(src) {
        MediaService.loadMedia(src).then(function(media){
            media.play();
        });
    }

    $scope.tiles = BoardService.getBoards()[0].tiles;

    $scope.getItem = function(row,col) {
        return $scope.tiles[0];
    }

});
