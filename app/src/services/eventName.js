module.exports = function() {
  return function(name, events) {
    var names, event, i;

    names = {};
    for(i = 0; i < events.length; i++) {
      event = events[i];
      names[event] = name + '.' + event;
    }

    return names;
  }
}
