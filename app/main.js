require.config({
    paths: {
        loader: '../libs/backbone/loader',
        jQuery: '../libs/jquery/jquery',
        Underscore: '../libs/underscore/underscore',
        Backbone: '../libs/backbone/backbone',
        Crafty: '../libs/crafty/crafty',
        EventEmitter: '../libs/eventemitter2/eventemitter2',
        Burst: '../libs/burst/burst',
        templates: '../templates',
        game: '../game',
        libs: '../libs'
    }
});

require(['app', 'game/components'], function(App) { App.initialize(); });
