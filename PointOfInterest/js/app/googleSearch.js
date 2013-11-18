define(['jquery'], function ($) {
    var GoogleApp = function (options) {
        var googleMap = new google.maps.Map(document.getElementById('googleMap'));
        var service = new google.maps.places.PlacesService(googleMap);
        var collection = options.collection;
        
        this.googleSearch = function (param, radius, center) {
            var d = $.Deferred();

            var _this = this;
            poiArr = [];
            
            var moscow = new google.maps.LatLng(center.lat, center.lon);
            var request = {
                location: moscow,
                radius: radius * 1000,
                query: param
            };

            function callback(results) {
                for (var i = 0; i < results.length; i++) {
                    poiArr.push({
                        name: results[i].name,
                        pos: { lon: results[i].geometry.location.lng(), lat: results[i].geometry.location.lat() },
                        adress: results[i].formatted_address,
                        searcher: "Google"
                    });
                }
                d.resolveWith(_this, [poiArr]);
            }

            service.textSearch(request, callback);
            return d;
        };

        this.resetColl = function(arr) {
            collection.reset(arr);
        };
    };
  

    return GoogleApp;
});