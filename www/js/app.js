var fb = new Firebase("https://popping-torch-6409.firebaseio.com/");

angular.module('jboard', ['johans.services', 'johans.controllers', 'ionic', 'ngCordova', 'firebase'])

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

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  // setup an abstract state for the tabs directive
  .state('boards', {
    url: '/boards',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('boards.grid0', {
    url: '/grid/0',
	data: {
	  tab: 0
	},
    views: {
      'boards-grid-0': {
        templateUrl: 'templates/tabs-tiles.html',
		controller: 'TileController',
      }
    }
  })
  
  .state('boards.grid1', {
    url: '/grid/1',
	data: {
		tab: 1
	},
    views: {
      'boards-grid-1': {
        templateUrl: 'templates/tabs-tiles.html',
        controller: 'TileController',
      }
    }
  })
  
  .state('boards.grid2', {
    url: '/grid/2',
	data: {
		tab: 2
	},
    views: {
      'boards-grid-2': {
        templateUrl: 'templates/tabs-tiles.html',
        controller: 'TileController',		  
      }
    }
  })
  
  .state('boards.grid3', {
    url: '/grid/3',
	data: {
	   tab: 3
	},
    views: {
      'boards-grid-3': {
        templateUrl: 'templates/tabs-tiles.html',
        controller: 'TileController',		  
      }
    }
  })
  
  .state('boards.grid4', {
    url: '/grid/4',
	data: {
	  tab: 4
	}, 
    views: {
      'boards-grid-4': {
        templateUrl: 'templates/tabs-tiles.html',
		controller: 'TileController',		  
      }
    }
  })
  
  .state("login", {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: "LoginController",
        cache: false
  })
    
  $urlRouterProvider.otherwise('/login');
});