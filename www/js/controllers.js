angular.module('johans.controllers', ['ionic', 'ngCordova'])

.controller('ImageCtrl', function($scope, $cordovaMedia, $ionicLoading, $ionicActionSheet, MediaService, BoardService, CameraService) {
	
	$scope.tileActionSheet = function() {
	    $ionicActionSheet.show({
	     buttons: [
	       { text: 'New Picture' },
		   { text: 'Voiceover' }
	     ],
	     destructiveText: 'Delete',
	     titleText: 'Edit Tile',
	     cancelText: 'Cancel',
	     buttonClicked: function(index) {
			 switch(index) {
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
	  
	  $scope.getPhoto = function() {
	      console.log('Getting camera');
	      Camera.getPicture({
	        quality: 75,
	        targetWidth: 320,
	        targetHeight: 320,
	        saveToPhotoAlbum: false
	      }).then(function(imageURI) {
	        console.log(imageURI);
	        $scope.lastPhoto = imageURI;
	      }, function(err) {
	        console.err(err);
	      })};
		    
	  
    $scope.onTap = function(r,c) {
        console.log("Tapped: " + r + ":" + c);
		$scope.tileActionSheet();
		CameraService.getPicture().then(function(imageURI) {
		      console.log(imageURI);
		    }, function(err) {
		      console.err(err);
		    });
      //  $scope.play("audio/test.wav")
    };
    
	$scope.repeat = function(i) {
        return i?$scope.repeat(i-1).concat(i):[]
    }

    $scope.play = function(src) {
        MediaService.loadMedia(src).then(function(media){
            media.play();
        });
    }
	
	$scope.getBoard = function(pos) {
		BoardService.getBoards()[pos];		
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