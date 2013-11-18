define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    var resultsModel = Backbone.Model.extend({
        defaults: {
            "name": "",
            "pos": {},
            "searcher": ""
        },      
        
    });

    return resultsModel;
});