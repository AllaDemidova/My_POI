define(['underscore', 'backbone'], function (_, Backbone) {
    var eventBus = _.extend({}, Backbone.Events);
    return eventBus;
});