angular.module('johans.controllers', ['ngCordova', 'firebase'])

.controller('TileController', function($scope, $state, $cordovaMedia, $ionicLoading, 
	$ionicActionSheet, $ionicHistory, $firebaseArray, MediaService, TileService, CameraService) {

	console.log("/tabs/" + $state.current.data.tab)

	$ionicHistory.clearHistory();
	$scope.mode = { editMode: false };

	$scope.tileActionSheet = function(index) {
		$ionicActionSheet.show({
			buttons: [{
				text: 'New Photo'
			}, {
				text: 'New Voiceover'
			}],
			destructiveText: 'Delete',
			titleText: 'Edit Tile',
			cancelText: 'Cancel',
			buttonClicked: function(ix) {
				switch (ix) {
					case 0:
						$scope.changePhoto(index);
						break;
					case 1:
						break;
					default:
						return;
				}
			}
		});
	};

	$scope.changePhoto = function(index) {
		CameraService.getPicture().then(function(imageData) {
			$scope.tiles[index].imageData = imageData;
		})
		$scope.tiles.$save(index);
	}
	
	$scope.changeVoice = function(index) {
		var src = "/src/voice_tab" + tab + "_index" + index + ".mp3";
		var media = $cordovaMedia.newMedia(src,function(){},function(err) {});
	    media.startRecord();

        // Stop recording after 10 sec
        var recTime = 0;
        var recInterval = setInterval(function() {
            recTime = recTime + 1;
            if (recTime >= 3) {
                clearInterval(recInterval);
                media.stopRecord();
				media.play();
            }
        }, 1000);
		
		//$scope.tiles.$save(index);
	}

	$scope.newTile = function(index) {
		CameraService.getPicture().then(function(imageData) {
			tile = TileService.newTile();
			tile.imageData = imageData;
			$scope.tiles.$add(tile).then(function() {
				alert("New tile has been uploaded");
			});
			console.log("Lenght now:" + $scope.tiles.length)
		}, function(error) {
			console.error(error);
		});
	}

	$scope.onTap = function(index) {
		console.log("Tapped index " + index + " Edit mode: " + $scope.editMode);
		if ($scope.mode.editMode) {
			$scope.tileActionSheet(index);
		} else {
			$scope.play(index)
		}
	};

	$scope.play = function(index) {
		var tile = $scope.tiles[index]
		if (tile.voiceover == null) {
			console.log("No voiceover available for " + index);
		} else {
			
			MediaService.loadMedia().then(function(media) {
				media.play();
			});
		}
	}

	var fbAuth = fb.getAuth();
	if (fbAuth) {
		var userReference = fb.child("users/" + fbAuth.uid);
		$scope.tiles = $firebaseArray(userReference.child("/tabs/" + $state.current.data.tab + "/"));
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