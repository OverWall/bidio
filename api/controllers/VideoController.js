/**
 * VideoController
 *
 * @description :: Server-side logic for managing Videos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _ = require('lodash');

module.exports = {

	getAll: function(req, res) {
		Video.getAll()
		.spread(function(models) {
			Video.watch(req);
			Video.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getSome: function(req, res) {
		var limit = req.param('limit');
		var skip = req.param('skip');

		var sort = req.param('sort');
		var filter = req.param('filter');


		Video.getSome(limit, skip, sort, filter)
		.then(function(models) {
			Video.watch(req);
			Video.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getTrending: function(req, res) {
		Video.getAll()
		.spread(function(models) {
			Video.watch(req);
			Video.subscribe(req, models);
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getRelated: function(req, res) {

		var limit = 6;
		var skip = 1;

		Video.getOne(req.param('id'))
		.spread(function(model) {

			var categoryList = model.categoryList;
			//only first for now
			var filter = categoryList.split(',')[0];

			Video.find()
	        .where({categoryList:{contains: filter }})
	        .limit(limit)
	        .skip(skip)
			.then(function(models) {
				Video.watch(req);
				Video.subscribe(req, model);
				res.json(models);
			})
			.fail(function(err) {
				res.send(404,err);
			});

		})
		.fail(function(err) {
			res.send(404);
		});

	},

	getOne: function(req, res) {
		Video.getOne(req.param('id'))
		.spread(function(model) {
			Video.subscribe(req, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	create: function (req, res) {
		
		var model = {
			title: req.param('title'),
			amazonUrl: req.param('amazonUrl'),
			description: req.param('description'),
			user: req.param('user')
		};

		Video.create(model)
		.exec(function(err, video) {
			if (err) {
				return console.log(err);
			}
			else {
				Video.publishCreate(video);
				res.json(video);
			}
		});
	},

	update: function(req, res) {
		
		var id = req.param('id');
	
		var model = {};

		Video.update( {id: id}, model).exec(function afterwards(err, updated){
		  if (err) {
		    return;
		  }
		  console.log(updated);
		});
		
	},

	destroy: function (req, res) {
		var id = req.param('id');
		if (!id) {
			return res.badRequest('No id provided.');
		}

		// Otherwise, find and destroy the model in question
		Video.findOne(id).exec(function(err, model) {
			if (err) {
				return res.serverError(err);
			}
			if (!model) {
				return res.notFound();
			}

			Video.destroy(id, function(err) {
				if (err) {
					return res.serverError(err);
				}

				Video.publishDestroy(model.id);
				return res.json(model);
			});
		});
	},

	
	
};

