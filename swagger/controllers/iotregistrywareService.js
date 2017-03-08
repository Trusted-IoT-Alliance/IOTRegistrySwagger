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

exports.generateRegisterOwnerSig = function(args, res, next) {
  /**
   * generate signature for registerName
   *
   * ownerName String name of owner
   * data String 
   * privateKeyStr String owner private key as string
   * returns String
   **/
  if(!args.OwnerName || !args.OwnerName.value) {
      throw new Error('missing owner name');
  }
  if(!args.Data || !args.Data.value) {
      throw new Error('missing data');
  }
  if(!args.PrivateKeyStr || !args.PrivateKeyStr.value) {
      throw new Error('missing PrivateKey');
  }
  var message = args.OwnerName.value + ':' + args.Data.value;
  console.log("\n\nmessage:" + message)

  var sig = messageSigner(message, args.PrivateKeyStr.value);

  res.end(JSON.stringify({sig: sig.toString('hex')}));
}

exports.generateRegisterSpecSig = function(args, res, next) {
  /**
   * generate signature for registerSpec
   *
   * specName String name of spec
   * ownerName String name of owner
   * data String 
   * privateKeyStr String owner private key as string
   * returns String
   **/
  if(!args.SpecName || !args.SpecName.value) {
      throw new Error('missing spec');
  }
  if(!args.OwnerName || !args.OwnerName.value) {
      throw new Error('missing owner name');
  }
  if(!args.Data || !args.Data.value) {
      throw new Error('missing data');
  }
  if(!args.PrivateKeyStr || !args.PrivateKeyStr.value) {
      throw new Error('missing PrivateKey');
  }
  var message = args.SpecName.value + ":" + args.OwnerName.value + ":" + args.Data.value;
  console.log("\n\nmessage:" + message)

  var sig = messageSigner(message, args.PrivateKeyStr.value);

  res.end(JSON.stringify({sig: sig.toString('hex')}));
}

exports.generateRegisterThingSig = function(args, res, next) {
  /**
   * generate signature for registerThing
   *
   * ownerName String name of owner
   * identities List identities of thing owner
   * spec String spec info
   * data String thing info
   * privateKeyStr String owner private key as string
   * returns String
   **/

  if(!args.OwnerName || !args.OwnerName.value) {
      throw new Error('missing owner name');
  }
  if(!args.Identities || !args.Identities.value || !args.Identities.value.length) {
      throw new Error('missing list of identities');
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
  var message = args.OwnerName.value

  args.Identities.value.forEach(function(o) {
      message +=  ':' + o;
  });
  message += ':' + args.Data.value + ":" + args.Spec.value;

  var sig = messageSigner(message, args.PrivateKeyStr.value);
  console.log("\n\nmessage: (%s)\nprivate key: (%s)\nsig: (%s)\n\n\n", message, args.PrivateKeyStr, sig.toString('hex'))

  res.end(JSON.stringify({sig: sig.toString('hex')}));
}

exports.ownerGET = function(args, res, next) {
  /**
   * get owner info
   *
   * ownerName String name of owner
   * returns String
   **/
  var timerID = setTimeout(function() {
      res.end(JSON.stringify({
          'status': 'OK'
      }));
  }, 45000);

  iotregistryware.owner(args.OwnerName.value, USER)
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
  iotregistryware.thing(args.ThingNonce.value, USER)
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

exports.ownerNamePOST = function(args, res, next) {
  /**
   * register owner name to ledger
   *
   * ownerName String Name of owner
   * pubkey String Public key of owner
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
      OwnerName: args.OwnerName.value,
      Pubkey: args.Pubkey.value,
      Signature: args.Signature.value,
      Data: args.Data.value,
  }

  if(!opts.OwnerName) {
      throw new Error('missing owner name');
  }

  if(!opts.Pubkey) {
      throw new Error('missing public key');
  }

  if(!opts.Signature) {
      throw new Error('missing signature');
  }

  if(!opts.Data) {
      throw new Error('missing data');
  }

  iotregistryware.registerOwner(opts, USER)
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
   * ownerName String name of spec owner
   * signature String sig of owner name + data
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
      OwnerName: args.OwnerName.value,
      Signature: args.Signature.value,
      Data: args.Data.value,
  }

  if(!opts.SpecName) {
      throw new Error('missing spec name');
  }
  if(!opts.OwnerName) {
      throw new Error('missing OwnerName');
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
   * identities List alternate identites of thing owner
   * ownerName String name of thing owner
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
      Identities: args.Identities.value,
      OwnerName:  args.OwnerName.value,
      Signature:  args.Signature.value,
      Data:       args.Data.value,
      Spec:       args.Spec.value,
  }

  if(!opts.Nonce) {
      throw new Error('missing nonce');
  }
  if(!opts.Identities) {
      throw new Error('missing list of identities');
  }
  if(!opts.OwnerName) {
      throw new Error('missing owner name');
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