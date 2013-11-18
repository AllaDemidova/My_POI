define(['jquery', 'underscore', 'backbone', 'app/selectFeature'], function ($, _, Backbone, selectFeature) {
    var Features = Backbone.View.extend({
        initialize: function(models, options) {
            _.bindAll(this, 'addPoiFeatures');
            this.collection.bind('reset', this.addPoiFeatures);
            this.models = this.collection.models;
            this.select = new selectFeature({ map: this.options.map });
        },
        addPoiFeatures: function () {           
            var featureLayer = this.options.map.featureLayer;
            var map = this.options.map.map;
            
            this.select.onResetFunction();
            featureLayer.removeAllFeatures();            
            
            $.each(this.models, function() {
                var transform = new OpenLayers.LonLat(this.get("pos").lon, this.get("pos").lat).transform(map.displayProjection, map.projection);
                var p = new OpenLayers.Geometry.Point(transform.lon, transform.lat);
                var f = new OpenLayers.Feature.Vector(p, { name: this.get("name"), adress: this.get("adress") }, { fillColor: 'red', fillOpacity: 0.8, pointRadius: 8 });
                featureLayer.addFeatures([f]);                
            });            
        },   
    });    
    return Features;
});

