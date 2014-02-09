// Turns milliseconds into minute measurements

module.exports = function() {
  return function(_seconds) {    
    var minutes, seconds;
    
    if(typeof _seconds !== 'undefined' || isNaN(_seconds)) {
      return '00:00';
    }

    minutes = Math.floor(_seconds / 60);
    seconds = Math.floor(((_seconds / 60) - minutes) * 60);

    seconds = seconds > 9 ? seconds : '0' + seconds;

    return minutes + ':' + seconds;
  }
}
