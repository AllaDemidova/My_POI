define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    var checkedSearcher = Backbone.View.extend({
        tagName: "div",
        
        initialize: function () {
            _.bindAll(this, 'render');
            this.model.bind("change", this.render);            
        },
        
        render: function () {           
            
            if (this.model.get("checkedRadio") == "yandex") {
                this.$el.html("<span>Будем искать:</span><br/> <img width ='120' height ='60' src='img/yandex.png'>");
            }
            else if (this.model.get("checkedRadio") == "google") {
                this.$el.html("<span>Будем искать:</span><br/> <img width ='120' src='img/google.png'>");
            }
            else if (this.model.get("checkedRadio") == "yandex_and_google") {
                this.$el.html("<span>Будем искать:</span><br/> <img width ='120' height ='60' src='img/yandex.png'> <img width ='120' src='img/google.png'>");
                
            }

            return this;
        },

        

    });

    return checkedSearcher;
});
