define(['jquery', 'underscore', 'backbone', 'text!template/poiSearch.html'], function ($, _, Backbone, poiSearchTemplate) {
    var Searcher = Backbone.View.extend({
        tagName: "form",
        
        template: _.template(poiSearchTemplate),
        
        initialize: function (models, options) {           

            this.map = this.options.map;
            this.yandexSearchModule = this.options.yandex;
            this.googleSearchModule = this.options.google;
            this.yandexAndGoogleSearchModule = this.options.yandexAndGoogle;
            
            _.bindAll(this, 'render');
            this.model.bind("change", this.render);
                        
        },

        events: {
            "click #butt": "search",
            "change input[type=radio]": "changeRadio",
            "keyup input#text": "changeText",
            "focus input#text": "textFocus"
        },
                
        changeText: function () {            
            this.model.set("textValue", this.$el.children("input#text").val());
            this.$el.children("input#text").focus();
        },
        
        textFocus: function() {            
            var input = this.$el.children("input#text")[0];
            var len = input.value.length;

            input.setSelectionRange(len, len);
        },
        
        changeRadio: function (evt) {
            var event = evt || window.event;
            var target = event.target || event.srcElement;            
            this.model.set({ checkedRadio: $(target).val() });               
        },
        
        render: function () {
            $(this.el).html(this.template({currentText: this.model.get("textValue"), currentCheck: this.model.get("checkedRadio")}));           
            return this;
        },
        
        search: function () {            
            var radius = 10;
            var param = this.$el.children("input#text").val();
            var centerMap = this.map.map.getCenter().transform(this.map.map.projection, this.map.map.displayProjection);
           
                /*-----yandex&google_search*/
            if (this.model.get("checkedRadio") == "yandex_and_google") {
                //console.log(this.yandexAndGoogleSearchModule);
                this.yandexAndGoogleSearchModule.addArrayre(param, radius, centerMap);
                
            }

                    /*-----yandex_search-----*/
            else if (this.model.get("checkedRadio") == "yandex") {                
                var defYandex = this.yandexSearchModule.yandexSearch(param, radius, centerMap);
                defYandex.done(this.yandexSearchModule.resetColl);
            }

                    /*-----google_search-----*/
            else if (this.model.get("checkedRadio") == "google") {
                var defGoogle = this.googleSearchModule.googleSearch(param, radius, centerMap);
                defGoogle.done(this.googleSearchModule.resetColl);
            }
               
        }        
    });
    return Searcher;
});