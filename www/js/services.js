angular.module('johans.services', ['ionic'])

// for media plugin : http://plugins.cordova.io/#/package/org.apache.cordova.media
.factory('MediaService', function($q, $ionicPlatform, $window){
  var service = {
    loadMedia: loadMedia,
    getStatusMessage: getStatusMessage,
    getErrorMessage: getErrorMessage
  };

  function loadMedia(src, onStop, onError, onStatus){
    var defer = $q.defer();
    $ionicPlatform.ready(function(){
      var mediaStatus = {
        code: 0,
        text: getStatusMessage(0)
      };
      var mediaSuccess = function(){
        mediaStatus.code = 4;
        mediaStatus.text = getStatusMessage(4);
        if(onStop){onStop();}
      };
      var mediaError = function(err){
        _logError(src, err);
        if(onError){onError(err);}
      };
      var mediaStatus = function(status){
        mediaStatus.code = status;
        mediaStatus.text = getStatusMessage(status);
        if(onStatus){onStatus(status);}
      };

      if($ionicPlatform.is('android')){src = '/android_asset/www/' + src;}
      var media = new $window.Media(src, mediaSuccess, mediaError, mediaStatus);
      media.status = mediaStatus;
      defer.resolve(media);
    });
    return defer.promise;
  }

  function _logError(src, err){
    console.error('MediaSrv error', {
      code: err.code,
      text: getErrorMessage(err.code)
    });
  }

  function getStatusMessage(status){
    if(status === 0){return 'Media.MEDIA_NONE';}
    else if(status === 1){return 'Media.MEDIA_STARTING';}
    else if(status === 2){return 'Media.MEDIA_RUNNING';}
    else if(status === 3){return 'Media.MEDIA_PAUSED';}
    else if(status === 4){return 'Media.MEDIA_STOPPED';}
    else {return 'Unknown status <'+status+'>';}
  }

  function getErrorMessage(code){
    if(code === 1){return 'MediaError.MEDIA_ERR_ABORTED';}
    else if(code === 2){return 'MediaError.MEDIA_ERR_NETWORK';}
    else if(code === 3){return 'MediaError.MEDIA_ERR_DECODE';}
    else if(code === 4){return 'MediaError.MEDIA_ERR_NONE_SUPPORTED';}
    else {return 'Unknown code <'+code+'>';}
  }

  return service;
})

.factory('BoardService', function(){
    var service = {
      getBoards: getBoards,
      nofBoards: nofBoards
    };

	function getBoards() {
		return boards;
	}

	function nofBoards() {
		return boards.length;
	}

	boards = [{
		pos: 0,
		cols: 3,
		rows: 3,
        title: 'Familie',
		tiles: [{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    }]
	}, {
		pos: 1,
		rows: 3,
		cols: 3,
        title: 'Mat',
		tiles : [{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    }]
	}, {
		pos: 2,
		rows: 3,
		cols: 3,
        title: 'Traktor',
		tiles : [{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    }]
	}, {
		pos: 3,
		rows: 3,
		cols: 3,
        title: 'Leke',
		tiles : [{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    }]
	}, {
		pos: 4,
		rows: 3,
		cols: 3,
        title: 'Dagsplan',
		tiles : [{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    },{
		        image: 'img/farm.png',
		        audio: ''
		    }]
	}]
	return service;
});
