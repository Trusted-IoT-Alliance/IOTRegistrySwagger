var bitcore = require("bitcore-lib")

var key = bitcore.PrivateKey()

var key_hash = bitcore.crypto.Hash.sha256(key.publicKey.toBuffer())
var addr= bitcore.encoding.Base58.encode(key_hash.slice(0,20))

console.log("Public Key: "+ key.publicKey)
console.log("Private Key: "+ key);
console.log("Hyperledger address hex "+ key_hash.slice(0,20).toString('hex'))
console.log("Hyperledger address Base58: "+ addr);