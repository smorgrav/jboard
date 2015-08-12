// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('jboard', ['johans.services', 'ionic', 'ngCordova'])

.directive('tabsSwipable', ['$ionicGesture', function($ionicGesture){
	//
	// make ionTabs swipable. leftswipe -> nextTab, rightswipe -> prevTab
	// Usage: just add this as an attribute in the ionTabs tag
	// <ion-tabs tabs-swipable> ... </ion-tabs>
	//
	return {
		restrict: 'A',
		require: 'ionTabs',
		link: function(scope, elm, attrs, tabsCtrl){
			var onSwipeLeft = function(){
				var target = tabsCtrl.selectedIndex() + 1;
				if(target < tabsCtrl.tabs.length){
					scope.$apply(tabsCtrl.select(target));
				}
			};
			var onSwipeRight = function(){
				var target = tabsCtrl.selectedIndex() - 1;
				if(target >= 0){
					scope.$apply(tabsCtrl.select(target));
				}
			};
		    
		    var swipeGesture = $ionicGesture.on('swipeleft', onSwipeLeft, elm).on('swiperight', onSwipeRight);
		    scope.$on('$destroy', function() {
		        $ionicGesture.off(swipeGesture, 'swipeleft', onSwipeLeft);
		        $ionicGesture.off(swipeGesture, 'swiperight', onSwipeRight);
		    });
		}
	};
}])

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
    
	$scope.repeat = function(i) {
        return i?$scope.repeat(i-1).concat(i):[]
    }

    $scope.play = function(src) {
        MediaService.loadMedia(src).then(function(media){
            media.play();
        });
    }
	
	$scope.boards = BoardService.getBoards();
	$scope.nofBoards =  BoardService.nofBoards();
    $scope.tiles = BoardService.getBoards()[0].tiles;
    $scope.rows = 3;
    $scope.cols = 3;
    
    $scope.getItem = function(row,col) {
        return $scope.tiles[0];
    }
	
    $scope.parentMode = false;

})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('boards', {
    url: '/boards',
    abstract: true,
    templateUrl: 'templates/boards.html'
  })

  // Each tab has its own nav history stack:

  .state('boards.grid0', {
    url: '/grid/0',
    views: {
      'boards-grid-0': {
        templateUrl: 'templates/boards-grid.html',
		controller: 'ImageCtrl'
      }
    }
  })
  
  .state('boards.grid1', {
    url: '/grid/1',
    views: {
      'boards-grid-1': {
        templateUrl: 'templates/boards-grid.html',
        controller: 'ImageCtrl'
      }
    }
  })
  
  .state('boards.grid2', {
    url: '/grid/2',
    views: {
      'boards-grid-2': {
        templateUrl: 'templates/boards-grid.html',
        controller: 'ImageCtrl'
      }
    }
  })
  
  .state('boards.grid3', {
    url: '/grid/3',
    views: {
      'boards-grid-3': {
        templateUrl: 'templates/boards-grid.html',
        controller: 'ImageCtrl'
      }
    }
  })
  
  .state('boards.grid4', {
    url: '/grid/4',
    views: {
      'boards-grid-4': {
        templateUrl: 'templates/boards-grid.html',
		controller: 'ImageCtrl'
      }
    }
  })
  
  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/boards/grid/0');

});