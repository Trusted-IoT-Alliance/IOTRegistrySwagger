var fs = require('fs');
var bitcore = require('bitcore-lib');
var config = {
    host: process.env.FQDN || 'localhost',
    port: process.env.TUXEDOPOPSWARE_PORT || 8082,

    store: {
        path: process.env.TUXEDOPOPSWARE_STORE_PATH || 'iotregistryware'
    },

    creds: {
        name: 'test_user4',
        password: '4nXSrfoYGFCP'
    },
    privKey: new bitcore.PrivateKey('d97b34bf2ada55ea1f7c8a6d81e92a1ab0b9b160a1f4f4b711d4738b128c6c8a'),

    members: process.env.TUXEDOPOPSWARE_MEMBERS || 'grpc://ec2-54-219-181-242.us-west-1.compute.amazonaws.com:7054',
    peer: process.env.TUXEDOPOPSWARE_PEER || 'grpc://ec2-54-219-181-242.us-west-1.compute.amazonaws.com:7051',
    events: process.env.TUXEDOPOPSWARE_EVENTS || 'grpc://ec2-54-219-181-242.us-west-1.compute.amazonaws.com:7053',
    chaincodeName: process.env.TUXEDOPOPSWARE_CHAINCODE_NAME || "fbefc030e743cf11507c58f5760e3879070ca12601cf6cb5d1f973d7e425892a0c142dfe26d5c17f7f61161fb623c6a6e3fcc4669b5067636d69a630ca5266c3",
}
console.log(config);
module.exports = config;
