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
    chaincodeName: process.env.TUXEDOPOPSWARE_CHAINCODE_NAME || "92b992781c0b6756ada79c8ff46acca232111026b4351d3f6c84c201606e0a6ae6c5af5115f042af2e24ee6e1ae42076d1cbbbea509d4c93f689f79e3be8f630",
}
console.log(config);
module.exports = config;
