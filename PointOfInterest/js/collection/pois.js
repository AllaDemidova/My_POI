define(['underscore', 'backbone', 'model/poi'], function (_, Backbone, Model) {
    var resultsCollection = Backbone.Collection.extend({
        model: Model,
    });
    return resultsCollection;
});