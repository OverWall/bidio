angular.module('models.video', ['lodash', 'services', 'sails.io',])

.service('VideoModel', function(lodash, utils, $sailsSocket) {
    this.getAll = function() {
        var url = utils.prepareUrl('video');
        return $sailsSocket.get(url).then(success, error);
    };
	
	/*this.getByUrl = function(model) {
        var url = utils.prepareUrl('video/url/' + model);
        return $sailsSocket.get(url).then(success, error);
    };*/
	
	this.getOne = function(model){
		var url = utils.prepareUrl('video/' + model);
		return $sailsSocket.get(url).then(success, error);
	};

    this.create = function(newModel) {
        var url = utils.prepareUrl('video');
        return $sailsSocket.post(url, newModel).then(success, error);
    };

	this.update = function(model) {
        var url = utils.prepareUrl('video/' + model.id);
        return $sailsSocket.post(url, model).then(success, error);
    };
	
    this.delete = function(model) {
        var url = utils.prepareUrl('video/' + model.id);
        return $sailsSocket.delete(url).then(success, error);
    };

    var success = function(response) {
        return response.data;
    };

    var error = function(error) {
        console.log(error);
    };
	
	
});