var protobuf = require('protobufjs');
var root;

console.log('grpc load');
module.exports = function load(cb) {
  console.log('load');
  if(!root) {
    protobuf.load(__dirname+'/tuxedo.proto').then(function(r) {
      root = r;
      var types = {
        CreateTX: root.lookup('CreateTX'),
      }
      cb(types);
    });
  } else {
    var types = {
      CreateTX: root.lookup('CreateTX'),
    }
    cb(types);
  }
}
