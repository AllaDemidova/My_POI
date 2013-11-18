define(['jquery'], function ($) {
    var yandex = function (options) {
        var collection = options.collection;
        
        this.yandexSearch = function(param, searchRadius, center) {
            var d = $.Deferred();
            var _this = this;
            var poiArr = new Array();            

            var ll = center.lon + ',' + center.lat;
            var spnLat = (searchRadius / (40075 / 360)) * 2;
            var spnLon = searchRadius / (40075 * Math.cos(center.lat) / 360) * 2;
            var spn = (spnLon + ',' + spnLat);

            $.getJSON('http://psearch-maps.yandex.ru/1.x/?format=json&results=200&rspn=1&key=AGMgXFEBAAAAdexCGQIAr4sm9zANdrJXqrmlMfHVKPzT2ocAAAAAAAAAAADbpicPBuxd4VbIkZ3IJRtT40s6PQ==&callback=?',
                { text: param, ll: ll, spn: spn },
                function(responce) {
                    var result = responce.response.GeoObjectCollection.featureMember;
                    for (var i = 0; i < result.length; i++) {
                        poiArr.push({
                            name: result[i].GeoObject.name,
                            pos: { lon: result[i].GeoObject.Point.pos.split(" ")[0], lat: result[i].GeoObject.Point.pos.split(" ")[1] },
                            adress: result[i].GeoObject.description,
                            searcher: "Yandex"
                        });
                    };
                    d.resolveWith(_this, [poiArr]);
                });
            return d;
        };

        this.resetColl = function(arr) {
            collection.reset(arr);
        };
    };

    return yandex;
});