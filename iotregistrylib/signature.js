var bitcore;
exports.init = function(b) {
    bitcore = b || require('bitcore-lib');
}

function messageSigner(message, privKeyString) {
    if(!bitcore) throw new Error('call init with bitcore lib as the first argument to use signature.js');
    if(!privKeyString) throw new Error('missing private key for message signer');
    if(!message) throw new Error('missing message for message signer');
    var privKey = new bitcore.PrivateKey(privKeyString);
    var messageBytes = bitcore.crypto.Hash.sha256(new Buffer(message));
    return bitcore.crypto.ECDSA.sign(messageBytes, privKey).toBuffer();
}

exports.createRegistrantSig = function(args) {
    if(!args.RegistrantName || !args.RegistrantName.value) {
      throw new Error('missing registrant name');
    }
    if(!args.RegistrantPubkey || !args.RegistrantPubkey.value) {
      throw new Error('missing registrant pubkey');
    }
    if(!args.Data || !args.Data.value) {
      throw new Error('missing data');
    }
    if(!args.PrivateKeyStr || !args.PrivateKeyStr.value) {
      throw new Error('missing PrivateKey');
    }
    var message = args.RegistrantName.value + ':' + args.RegistrantPubkey.value + ":" + args.Data.value;
    console.log("\n\nmessage:" + message)

    var sig = messageSigner(message, args.PrivateKeyStr.value);

    return sig.toString('hex');
};

exports.generateThingSig = function(args) {
  if(!args.RegistrantPubkey || !args.RegistrantPubkey.value) {
      throw new Error('missing Registrant name');
  }
  if(!args.Aliases || !args.Aliases.value || !args.Aliases.value.length) {
      throw new Error('missing list of aliases');
  }
  if(!args.Spec || !args.Spec.value) {
      throw new Error('missing spec');
  }
  if(!args.Data || !args.Data.value) {
      throw new Error('missing data');
  }
  if(!args.PrivateKeyStr || !args.PrivateKeyStr.value) {
      throw new Error('missing PrivateKey');
  }
  var message = args.RegistrantPubkey.value

  args.Aliases.value.forEach(function(o) {
      message +=  ':' + o;
  });
  message += ':' + args.Data.value + ":" + args.Spec.value;

  var sig = messageSigner(message, args.PrivateKeyStr.value);
  console.log("\n\nsigned thing message:\n%s\nprivate key: (%s)\nsig: (%s)\n\n\n", message, args.PrivateKeyStr, sig.toString('hex'))

    return sig.toString('hex');
};

exports.generateSpecSig = function(args) {
  if(!args.SpecName || !args.SpecName.value) {
      throw new Error('missing spec');
  }
  if(!args.RegistrantPubkey || !args.RegistrantPubkey.value) {
      throw new Error('missing Registrant name');
  }
  if(!args.Data || !args.Data.value) {
      throw new Error('missing data');
  }
  if(!args.PrivateKeyStr || !args.PrivateKeyStr.value) {
      throw new Error('missing PrivateKey');
  }
  var message = args.SpecName.value + ":" + args.RegistrantPubkey.value + ":" + args.Data.value;
  console.log("\n\nmessage:" + message)

  var sig = messageSigner(message, args.PrivateKeyStr.value);

    return sig.toString('hex');
};
