var soundcloud = require('soundclouder');

module.exports = function(){

    var login = function(user, pass){
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
