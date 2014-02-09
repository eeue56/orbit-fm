module.exports = function(storage) {
  var settings = storage('orbit-settings');
  
  return {
    get: settings.get,
    set: settings.set,
  };
}
