define(['jquery', 'underscore', 'backbone', 'event'], function ($, _, Backbone, event) {
    var Items = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this, 'changeSearcherName', 'render');
            this.model.bind("change:searcher", this.render);
            event.bind("changeSearcherName", this.changeSearcherName);
        },
        
        tagName: "li",
        
        render: function () {
            this.$el.html("<a class='poi' href='#'>" + this.model.get("name") + "(" + this.model.get("searcher") + ")" + "</a>");           
            return this;
        },
        
        changeSearcherName: function () {
            this.model.set("searcher", "test");
        },
        
    });

    return Items;
});
