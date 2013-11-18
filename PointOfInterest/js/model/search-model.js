define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    var searcherProperties = Backbone.Model.extend({
        defaults: {
            checkedRadio: "yandex",
            textValue: ""            
        },
    });
    return searcherProperties;
});