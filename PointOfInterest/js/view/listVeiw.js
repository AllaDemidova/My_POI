define(['jquery', 'underscore', 'backbone', 'view/itemVeiw'], function ($, _, Backbone, itemResult) {
    var List = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this, 'addOne', 'render');
            this.collection.bind('reset', this.render);
        },
        tagName: "ul",        
        addOne: function (poiModel) {
            var item = new itemResult({model: poiModel});
            this.$el.append(item.render().el);
        },        
        render: function () {            
            this.$el.empty();
            if (this.collection.length == 0) {
                this.$el.append('<i>По данному запросу ничего не найдено</i>');
                return;
            }            
            this.collection.forEach(this.addOne);
            return this;
        },
    });
    return List;
});
