const player = require('play-sound')(opts = {});

function notify(what = 'file_example_MP3_700KB.mp3') {
    player.play('./sounds/' + what, function (err) {
        if (err) throw err
    })
}

module.exports = notify;
