var soundcloud = require('soundclouder');

module.exports = function(){

    var login = function(cb, user, pass){
        //TODO : config loader
        soundcloud.init(user, pass, '');
    };

    var playSong(req, res){
        var uri = req.params.uri;

    };

    return {
        login : function(){},
        playSong : playSong
    };
}
