requirejs.config({
    "paths": {
        OpenLayers: 'lib/OpenLayers',
        OL_Yandex: 'lib/OL_Yandex',
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',        
        text: 'lib/text'
    },
    
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
}

});


require(['jquery', 'view/mainVeiw'], function ($, main) {
    new main();
});

