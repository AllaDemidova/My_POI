define(['jquery'], function ($) {
    var yandexAndGoogle = function (options) {
        var yandex = options.yandex;
        var google = options.google;
        var collection = options.collection;

        this.addArrayre = function(param, radius, centerMap) {
            _this = this;
            var defYandex = yandex.yandexSearch(param, radius, centerMap);
            var defGoogle = google.googleSearch(param, radius, centerMap);
            $.when(defYandex, defGoogle).done(function(arr1, arr2) {
                _this.resetColl(arr1, arr2);
            });
        };
        this.resetColl = function(arr1, arr2) {
            if (arr1 && arr2) {
                var poiFullArr = arr1.concat(arr2);
                collection.reset(poiFullArr);
            }
        };
    };
    return yandexAndGoogle;
});