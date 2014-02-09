var express = require('express');
    http = require('http');
    path = require('path');

    spotify = require('./spotify-stream');
    soundcloud = require('./soundcloud-stream');
    youtube = require('./youtube-stream');
    
    app = express();

// all environments
app.set('port', process.env.PORT || 8040);
app.set('views', __dirname + '/views');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/soundcloud/:uri', function(req, res) {
    soundcloud.login();
    soundcloud.playSong(req, res);
});

app.get('/spotify/:uri', function(req, res) {
    spotify.login(function() {
      spotify.playSong(req, res);
    });
});

app.get('/youtube/:uri', function(req, res) {
    youtube.login();
    youtube.playSong(req, res);
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
