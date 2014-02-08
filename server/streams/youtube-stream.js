var ytdl = require('ytdl');
var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');

module.exports = function(){

    var playSong = function(req, res){
        var url = req.params.url;

        res.contentType("mpeg");
        var video = ytdl(url);

        new ffmpeg({
            source : video
        })
        .toFormat('mp3')
        .writeToStream(res, function(code, error){
            if error throw error;
            console.log('file has been converted succesfully', code);
        });
    };

    return {
        login : function(){},
        playSong : playSong
    };
}
