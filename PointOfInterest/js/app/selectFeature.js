define(['OpenLayers', 'underscore', 'text!template/popupTemplate.html'], function (maps, _, popupTemplate) {

    function selectFeature(options) {
        var map = options.map.map;
        var featureLayer = options.map.featureLayer;
        var model = options.model;
        var template = _.template(popupTemplate);
        
        var selectControl = new OpenLayers.Control.SelectFeature(featureLayer, {
            onSelect: function (feature) {
                var layer = feature.layer;
                feature.style = {
                    pointRadius: 12,
                    externalGraphic: "img/devil.png"
                }
                layer.drawFeature(feature);
                var content = template({ featureName: feature.attributes.name, featureAdress: feature.attributes.adress });
               
                var popup = new OpenLayers.Popup.FramedCloud(null, feature.geometry.getBounds().getCenterLonLat(), new OpenLayers.Size(250, 100), content, null, true, onPopupClose);
                feature.popup = popup;
                map.addPopup(popup);
            },
            onUnselect: function (feature) {
                map.removePopup(feature.popup);
                var layer = feature.layer;
                feature.style = {
                    fillColor: 'red',
                    fillOpacity: 0.8,
                    pointRadius: 8
                }
                layer.drawFeature(feature);
            }
        });

        var onPopupClose = function () {            
            selectControl.unselectAll();
        };

        map.addControl(selectControl);
        selectControl.activate();

        this.onResetFunction = onPopupClose;
    }

    return selectFeature;
});