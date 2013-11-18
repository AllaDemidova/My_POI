define(['OpenLayers', 'lib/OpenLayers.debug', 'OL_Yandex'], function (maps, debug, olYandexMap) {
    function Map() {
        
        var map = new OpenLayers.Map('map');
        
        map.displayProjection = new OpenLayers.Projection("EPSG:4326");
        map.projection = new OpenLayers.Projection("EPSG:900913");
        
        var layers = [
                new OpenLayers.Layer.Google("Google", { minZoomLevel: 4, numZoomLevels: 17 }),
                new OpenLayers.Layer.Google("Google Satellite", { type: google.maps.MapTypeId.SATELLITE, minZoomLevel: 4, numZoomLevels: 17 }),
                new OpenLayers.Layer.OSM();                
        ];
        
        map.addLayers(layers);
        var control = new OpenLayers.Control.LayerSwitcher();
        map.addControl(control);
              
        var bounds = new OpenLayers.Bounds(37.3471, 55.5582, 37.8620, 55.9221).transform(map.displayProjection, map.projection);
        map.zoomToExtent(bounds);
        
        var featureLayer = new OpenLayers.Layer.Vector("POIs", { isBaseLayer: false, displayInLayerSwitcher: false, rendererOptions: { zIndexing: true } });
        map.addLayers([featureLayer]);        
        
        this.map = map;
        this.featureLayer = featureLayer;        
    }

    return Map;

})
