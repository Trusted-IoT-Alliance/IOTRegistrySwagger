'use strict';
var config = require('../../examples/config.js');
var bitcore = require('bitcore-lib');
var iotregistryware = require('../../index');

var USER = null;
iotregistryware.initialize(config.members, config.peer, config.events, config.creds, null, config.chaincodeName, function(err, user) {
    if (err) {
        throw 'User registration error:' + err;
    }
    USER = user;
});

function messageSigner(message, privKeyString) {
    var privKey = new bitcore.PrivateKey(privKeyString);
    var messageBytes = bitcore.crypto.Hash.sha256(new Buffer(message));
    return bitcore.crypto.ECDSA.sign(messageBytes, privKey).toBuffer();
}

exports.createRegistrantSig = function(args, res, next) {
  /**
   * generate signature for registerName
   *
   * RegistrantName String name of Registrant
   * data String 
   * privateKeyStr String Registrant private key as string
   * returns String
   **/
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

  res.end(JSON.stringify({sig: sig.toString('hex')}));
}

exports.generateRegisterSpecSig = function(args, res, next) {
  /**
   * generate signature for registerSpec
   *
   * specName String name of spec
   * RegistrantName String name of Registrant
   * data String 
   * privateKeyStr String Registrant private key as string
   * returns String
   **/
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

  res.end(JSON.stringify({sig: sig.toString('hex')}));
}

exports.generateRegisterThingSig = function(args, res, next) {
  /**
   * generate signature for registerThing
   *
   * RegistrantName String name of Registrant
   * aliases List aliases of thing Registrant
   * spec String spec info
   * data String thing info
   * privateKeyStr String Registrant private key as string
   * returns String
   **/

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

  res.end(JSON.stringify({sig: sig.toString('hex')}));
}

exports.registrantGET = function(args, res, next) {
  /**
   * get registrant info
   *
   * registrantPubkey String
   * returns String
   **/
  var timerID = setTimeout(function() {
      res.end(JSON.stringify({
          'status': 'OK'
      }));
  }, 45000);

  iotregistryware.registrantGET(args.RegistrantPubkey.value, USER)
  .then(function(data) {
      console.log('data', data);
      if (data.data.result.toString() === '{}') {
          res.statusCode = 404;
          res.end();
          clearTimeout(timerID);
      } else {
          console.log("\n\n\nhere\n\n\n")
          res.end(data.data.result.toString());
          clearTimeout(timerID);
      }
  }).catch(function(err) {
      console.log(err);
      res.end(JSON.stringify(err));
      clearTimeout(timerID);
  });
}

exports.specGET = function(args, res, next) {
  /**
   * get spec info
   *
   * specName String Name of spec
   * returns String
   **/
  var timerID = setTimeout(function() {
      res.end(JSON.stringify({
          'status': 'OK'
      }));
  }, 45000);

  iotregistryware.spec(args.SpecName.value, USER)
  .then(function(data) {
      console.log('data', data);
      if (data.data.result.toString() === '{}') {
          res.statusCode = 404;
          res.end();
          clearTimeout(timerID);
      } else {
          res.end(data.data.result.toString());
          clearTimeout(timerID);
      }
  }).catch(function(err) {
      console.log(err);
      res.end(JSON.stringify(err));
      clearTimeout(timerID);
  });
}

exports.thingGET = function(args, res, next) {
  /**
   * get thing info
   *
   * thingNonce String Nonce of thing
   * returns String
  **/
  var timerID = setTimeout(function() {
      res.end(JSON.stringify({
          'status': 'OK'
      }));
  }, 45000);

  console.log("\n\nargs: " + args + "\n\n\n")
  iotregistryware.thing(args.Alias.value, USER)
  .then(function(data) {
      console.log('data', data);
      if (data.data.result.toString() === '{}') {
          res.statusCode = 404;
          res.end();
          clearTimeout(timerID);
      } else {
          res.end(data.data.result.toString());
          clearTimeout(timerID);
      }
  }).catch(function(err) {
      console.log(err);
      res.end(JSON.stringify(err));
      clearTimeout(timerID);
  });
}

exports.registrantPOST = function(args, res, next) {
  /**
   * register Registrant name to ledger
   *
   * RegistrantPubkey
   * pubkey String Public key of Registrant
   * signature String Sig of name and data
   * data String data for registerOwnerName
   * returns Boolean
   **/
  console.log('Owner POST');
  var timerID = setTimeout(function() {
      res.end(JSON.stringify({
          'status': 'OK'
      }));
  }, 45000);

  var opts = {
      RegistrantName: args.RegistrantName.value,
      RegistrantPubkey: args.RegistrantPubkey.value,
      Signature: args.Signature.value,
      Data: args.Data.value,
  }

  if(!opts.RegistrantName) {
      throw new Error('missing Registrant name');
  }

  if(!opts.RegistrantPubkey) {
      throw new Error('missing public key');
  }

  if(!opts.Signature) {
      throw new Error('missing signature');
  }

  if(!opts.Data) {
      throw new Error('missing data');
  }

  iotregistryware.registrantPOST(opts, USER)
  .then(function(result) {
      res.end(JSON.stringify(result));
      clearTimeout(timerID);
  }).catch(function(err) {
      res.statusCode = 500;
      console.log(err);
      res.end(JSON.stringify(err));
      clearTimeout(timerID);
  });
}

exports.specPOST = function(args, res, next) {
  /**
   * register specification to ledger
   *
   * specName String name of specification
   * RegistrantPubkey
   * signature String sig of Registrant name + data
   * data String specification data
   * returns String
   **/
  console.log('Spec POST');
  var timerID = setTimeout(function() {
      res.end(JSON.stringify({
          'status': 'OK'
      }));
  }, 45000);

  var opts = {
      SpecName: args.SpecName.value,
      RegistrantPubkey: args.RegistrantPubkey.value,
      Signature: args.Signature.value,
      Data: args.Data.value,
  }

  if(!opts.SpecName) {
      throw new Error('missing spec name');
  }
  if(!opts.RegistrantPubkey) {
      throw new Error('missing RegistrantPubkey');
  }
  if(!opts.Signature) {
      throw new Error('missing signature');
  }
  if(!opts.Data) {
      throw new Error('missing data');
  }

  iotregistryware.registerSpec(opts, USER)
  .then(function(result) {
      res.end(JSON.stringify(result));
      clearTimeout(timerID);
  }).catch(function(err) {
      res.statusCode = 500;
      console.log(err);
      res.end(JSON.stringify(err));
      clearTimeout(timerID);
  });
}

exports.thingPOST = function(args, res, next) {
  /**
   * register thing
   *
   * nonce String Nonce for thing
   * identities List alternate identites of thing Registrant
   * RegistrantPubkey
   * signature String sig of nonce + identities + data + spec
   * data String thing data
   * spec String spec for thing
   * returns Boolean
   **/
  console.log('Thing POST');
  var timerID = setTimeout(function() {
      res.end(JSON.stringify({
          'status': 'OK'
      }));
  }, 45000);

  var opts = {
      Nonce:      args.Nonce.value,
      Aliases: args.Aliases.value,
      RegistrantPubkey:  args.RegistrantPubkey.value,
      Signature:  args.Signature.value,
      Data:       args.Data.value,
      Spec:       args.Spec.value,
  }

  if(!opts.Nonce) {
      throw new Error('missing nonce');
  }
  if(!opts.Aliases) {
      throw new Error('missing list of aliases');
  }
  if(!opts.RegistrantPubkey) {
      throw new Error('missing registrant pubkey');
  }
  if(!opts.Signature) {
      throw new Error('missing signature');
  }
  if(!opts.Data) {
      throw new Error('missing data');
  }
  if(!opts.Spec) {
      throw new Error('missing spec name');
  }
  console.log("\n\n\nopts:\n" + JSON.stringify(opts, null, 4) + "\n\n\n");
  iotregistryware.registerThing(opts, USER)
  .then(function(result) {
      res.end(JSON.stringify(result));
      clearTimeout(timerID);
  }).catch(function(err) {
      res.statusCode = 500;
      console.log(err);
      res.end(JSON.stringify(err));
      clearTimeout(timerID);
  });
}