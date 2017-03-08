var fs = require('fs');
var bitcore = require('bitcore-lib');
var config = {
    host: process.env.FQDN || 'localhost',
    port: process.env.TUXEDOPOPSWARE_PORT || 8082,

    store: {
        path: process.env.TUXEDOPOPSWARE_STORE_PATH || 'iotregistryware'
    },

    creds: {
        name: 'test_user6',
        password: 'b7pmSxzKNFiw'
    },
    privKey: new bitcore.PrivateKey('d97b34bf2ada55ea1f7c8a6d81e92a1ab0b9b160a1f4f4b711d4738b128c6c8a'),

    members: process.env.TUXEDOPOPSWARE_MEMBERS || 'grpc://ec2-54-219-181-242.us-west-1.compute.amazonaws.com:7054',
    peer: process.env.TUXEDOPOPSWARE_PEER || 'grpc://ec2-54-219-181-242.us-west-1.compute.amazonaws.com:7051',
    events: process.env.TUXEDOPOPSWARE_EVENTS || 'grpc://ec2-54-219-181-242.us-west-1.compute.amazonaws.com:7053',
    chaincodeName: process.env.TUXEDOPOPSWARE_CHAINCODE_NAME || "a4e05bc298633458cc6dc0fae58a05f370f6b1136fccdb29bb837ff53c661f20dc2fabbc08353a1c133164ef445f8b759048996dea322468a7c6e72ee1f21af4",
}
console.log(config);
module.exports = config;
