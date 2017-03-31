var fs = require('fs');
var bitcore = require('bitcore-lib');
var config = {
    host: process.env.FQDN || 'localhost',
    port: process.env.IOTREGISTRY_PORT || 8082,

    store: {
        path: process.env.IOTREGISTRY_STORE_PATH || 'iotregistryware'
    },

    creds: {
        name: 'test_user4',
        password: '4nXSrfoYGFCP'
    },
    privKey: new bitcore.PrivateKey('d97b34bf2ada55ea1f7c8a6d81e92a1ab0b9b160a1f4f4b711d4738b128c6c8a'),

    members: process.env.IOTREGISTRY_MEMBERS || 'grpc://ec2-54-219-181-242.us-west-1.compute.amazonaws.com:7054',
    peer: process.env.IOTREGISTRY_PEER || 'grpc://ec2-54-219-181-242.us-west-1.compute.amazonaws.com:7051',
    events: process.env.IOTREGISTRY_EVENTS || 'grpc://ec2-54-219-181-242.us-west-1.compute.amazonaws.com:7053',
    chaincodeName: process.env.IOTREGISTRY_CHAINCODE_NAME || "64d314667b65b9249fc070067bc6c54facfa14c831d79f63b1940b1fd50b5d70c33e1890c021bb65dd3a393ad192364b8ef08c366343130582ce2ea84044f3e5",
}
console.log(config);
module.exports = config;
