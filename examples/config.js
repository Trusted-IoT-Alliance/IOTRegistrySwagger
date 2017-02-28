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
    chaincodeName: process.env.TUXEDOPOPSWARE_CHAINCODE_NAME || "27df50fe277c798419e15441499dfd2523265055df52cc97b39d53effbd5ae4da60442b5471a6c2c90ff02f74d390e6a1f7e6314556d629664b874a20452f102",
}
console.log(config);
module.exports = config;
