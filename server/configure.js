
const path = require('path'),
      routes = require('./routes'),
      expressHandleBars = require('express-handlebars'),
      express = require('express'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      morgan = require('morgan'),
      methodOverride = require('method-override'),
      errorHandler = require('errorhandler');
      moment = require('moment');

module.exports = function(app){
    app.use(morgan('dev'));
    app.use(bodyParser({
        uploadDir: path.join(__dirname, 'public/upload/temp')
    }));
    app.use(methodOverride());
    app.use(cookieParser('some-secret-value-here'));
    routes(app);

    app.use('/public/', express.static(path.join(__dirname, '../public')));

    if('development' === app.get('env')){
        app.use(errorHandler());
    }

    //default view rendering engine
    app.engine('handlebars', expressHandleBars.create({
        defaultLayout: 'main',
        layoutDir: app.get('views') + '/layouts',
        partialDir: [app.get('views') + '/partials'],
        helpers: {
            timeago: function(timestamp) {
                return moment(timestamp).startOf('minute').fromNow();
            }
        },
    }).engine);
    app.set('view engine', 'handlebars');

    return app;
};

