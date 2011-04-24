var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/cms');
mongoose.model('navItems', require('../models/site').navItems);

module.exports = {

	routes: {
		'site': {
			'url': '/site',
			'method': 'get'
		}
	},
	
	site: function(req, res){
		var navitems = mongoose.model('navItems');
		navitems.find({}, function(err, docs){
			var items = [];
			docs.forEach(function(record){
				if (record.doc.name) items.push(record.doc);
			});
			res.partial('site/site', {
				locals: {
					pages: items
				}
			});
		});
	}
	
};