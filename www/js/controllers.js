angular.module('johans.controllers', ['johans.filters', 'ngCordova'])

.controller('TileController', function($scope, $state, $cordovaMedia, $ionicLoading, 
	$ionicActionSheet, $ionicHistory, $firebaseArray, MediaService, TileService, CameraService) {

	console.log("/tabs/" + $state.current.data.tab)

	$ionicHistory.clearHistory();
	$scope.tiles = [];
	$scope.editMode = false;

	$scope.tileActionSheet = function() {
		$ionicActionSheet.show({
			buttons: [{
				text: 'New Photo'
			}, {
				text: 'Voiceover'
			}],
			destructiveText: 'Delete',
			titleText: 'Edit Tile',
			cancelText: 'Cancel',
			buttonClicked: function(index) {
				switch (index) {
					case 0:
						$scope.getPhoto();
						break;
					case 1:
						break;
					default:
						return;
				}
			}
		});
	};

	$scope.newTile = function(index) {
		CameraService.getPicture().then(function(imageData) {
			tile = TileService.newTile();
			tile.imageDate = imageData;
			$scope.tiles.$add(tile).then(function() {
				alert("New tile has been uploaded");
			});
		}, function(error) {
			console.error(error);
		});
	}

	$scope.onTap = function(index, tab) {
		console.log("Tapped in tab: " + tab + " index: " + index);
		if ($scope.editMode) {
			$scope.tileActionSheet();
		} else {
			$scope.play(index)
		}
	};

	$scope.play = function(index) {
		var tile = $scope.tiles[index]
		if (tile.voiceover == nil) {
			console.log("No voiceover available for " + index);
		} else {
			MediaService.loadMedia(tile.voiceover).then(function(media) {
				media.play();
			});
		}
	}

	var fbAuth = fb.getAuth();
	if (fbAuth) {
		var userReference = fb.child("users/" + fbAuth.uid);
		$scope.tiles = $firebaseArray(userReference.child("/tabs/" + $state.current.data.tab));
	} else {
		$state.go("login");
	}
})

.controller("LoginController", function($scope, $state, $firebaseAuth) {

	var fbAuth = $firebaseAuth(fb);

	$scope.login = function(username, password) {
		fbAuth.$authWithPassword({
			email: username,
			password: password
		}).then(function(authData) {
			console.log("Authenticated!");
			$state.go("boards.grid0");
		}).
		catch (function(error) {
			console.error("ERROR: " + error);
		});
	}

	$scope.register = function(username, password) {
		fbAuth.$createUser({
			email: username,
			password: password
		}).then(function(userData) {
			return fbAuth.$authWithPassword({
				email: username,
				password: password
			});
		}).then(function(authData) {
			console.log("Authenticated!");
			$state.go("boards.grid0");
		}).
		catch (function(error) {
			console.error("ERROR: " + error);
		});
	}
});