var ytdl = require('ytdl');
var ffmpeg = require('fluent-ffmpeg');

module.exports = function(){

    var playSong = function(req, res){
        var uri = "https://youtube.com/watch?v=" + req.params.uri;

        res.contentType("mpeg");
        var video = ytdl(url);

        new ffmpeg({
            source : video
        })
        .toFormat('mp3')
        .writeToStream(res, function(error, code){
            if(error) throw error;
            console.log('file has been converted succesfully', code);
        });
    };

    return {
        login : function(){},
        playSong : playSong
    };
}
