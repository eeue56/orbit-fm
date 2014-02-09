var Spotify = require('spotify-web');
var credentials = require('./credentials.js');

module.exports = (function() {
    var login = function(cb){
        Spotify.login(credentials.user, credentials.password, function(err, _spotify) {
            if(err) throw err;
            spotify = _spotify;
            if(cb) {
                cb();
            }
        });
    };

    var playSong = function(req, res){

        var uri = req.params.uri;

        Spotify.get(uri, function(err, track){
            track.play()
            .on('err', function(err){
                console.error("Failed to play correctly!", err);
            })
            .on('finish', function(){
                console.log("Finshed stream!")
            })
            .pipe(req);
        });
    };

    return {
        playSong : playSong,
        login : login
    };
})();
