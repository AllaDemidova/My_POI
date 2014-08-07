define(['jquery',
        'underscore',
        'backbone',
        'app/map',
        'app/googleSearch',
        'app/yandexSearch',
        'view/listVeiw',
        'view/poisFeatureView',
        'view/searchVeiw',
        'collection/pois', 'model/search-model', 'view/checkedSearcherView',
        'app/yandexAndGoogleSearch'],
    function ($, _, Backbone, maps, GoogleSearchModule, YandexSearchModule, listResults, featureResults, Searcher, collection,
        searchModel, checkedSearcher, YandexAndGoogleSearchModule) {
        var Main = Backbone.View.extend({
            el: $(".searcher-results"),
            
            initialize: function () {
                var Map = new maps();                             
                
                var coll = new collection();                              
                var searcherModel = new searchModel;
                
                var yandexSearchModule = new YandexSearchModule({ collection: coll });
                var googleSearchModule = new GoogleSearchModule({collection: coll});                              
                var yandexAndGoogleSearchModule = new YandexAndGoogleSearchModule({collection: coll, yandex: yandexSearchModule, google: googleSearchModule});                            

                for (var i = 0; i < 2; i++){
                    var searcher = new Searcher({ map: Map, yandex: yandexSearchModule, google: googleSearchModule, yandexAndGoogle: yandexAndGoogleSearchModule, model: searcherModel });
                    this.$el.append(searcher.render().el);
                }

                var showCheckedSearcher = new checkedSearcher({ model: searcherModel });
                this.$el.append(showCheckedSearcher.render().el);
                
                
                var list = new listResults({ collection: coll });
                this.$el.append(list.el);
                var features = new featureResults({ collection: coll, map: Map });
               
            },
                                         
        });

    return Main;
});