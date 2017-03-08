var bitcore = require("bitcore-lib")

var key = bitcore.PrivateKey()

console.log("Public Key: "+ key.publicKey)
console.log("Private Key: "+ key)