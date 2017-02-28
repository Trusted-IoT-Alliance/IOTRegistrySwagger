var config = require('./examples/config.js');
var hfc = require('hfc');
var WebHooks = require('node-webhooks');
var Types = require('./types.js');
var RegisterThingTX = Types.RegisterThingTX;
var RegisterIdentityTX = Types.RegisterIdentityTX;
var RegisterSpecTX = Types.RegisterSpecTX;
var USER;
var MEMBER_SERVICES;
var HYPERLEDGER_PEER;
var CHAINCODENAME;
var HL_EVENTS;
var chain = hfc.newChain('doc_proof_chain');

chain.setECDSAModeForGRPC(true);

var webHooks = null;
var webhookname = "DefaultWebhook";
console.log('config', config);
chain.setKeyValStore(hfc.newFileKeyValStore(config.store.path));


// Call this function after importing the docproofware library Arguments are optional and overrride the defaults.
var initialize = function (ca, peer, hl_events, user, pem, chaincodeName, cb) {
    console.log('init');
    MEMBER_SERVICES = ca ? ca : MEMBER_SERVICES;
    HYPERLEDGER_PEER = peer ? peer : HYPERLEDGER_PEER;
    USER = user ? user : USER;
    CHAINCODENAME = chaincodeName ? chaincodeName : CHAINCODENAME;
    HL_EVENTS = hl_events ? hl_events : HL_EVENTS;
    if (!cb) {
        cb = function (err, user) {
            if (err)
                console.log('You may need fresh credentials from the CA' + err);
            if (user)
                console.log('Registration Okay');
        };
    }
    configChain(pem);
    getUser(USER, cb);
    webHooks = new WebHooks({
        db: './webHooksDB.json'
    });
    var eh = chain.getEventHub();

    if(!CHAINCODENAME) throw new Error('missing chaincode name');

    var regid = eh.registerChaincodeEvent(CHAINCODENAME, "evtsender", function (event) {
        console.log("Custom event received, payload: " + event.payload.toString() + "\n");
        console.log("Firing webhook: " + webhookname);
        webHooks.trigger(webhookname, { uuid: event.payload.toString() });
    });
};

function configChain(pem) {
    chain.setMemberServicesUrl(MEMBER_SERVICES, { pem: pem });
    chain.addPeer(HYPERLEDGER_PEER, { pem: pem });
    chain.eventHubConnect(HL_EVENTS, { pem: pem });
}

function getUser(creds, cb) {
    chain.getUser(creds.name, function (err, user) {
        console.log(err, user);
        if (err)
            return cb(err);
        if (user.isEnrolled())
            return cb(null, user);
        // User is not enrolled yet, so perform both registration and enrollment
        // Enrollement is stored in the local key value store. Enrollment credentials
        // are signel use. You may need a new credential from the CA
        console.log('Try to Enroll');
        chain.enroll(creds.name, creds.password, function (err) {
            if (err) {
                console.log('enroll error', err);
                return cb(err);
            }
            chain.setRegistrar(user);
            console.log('got user', user);
            return cb(null, user);
        });
    });
}

function deployBracketStore(user, cb) {
    user.getUserCert(null, function (err, userCert) {
        if (err)
            return cb(err);
        var deployRequest = {
            // Function to trigger
            fcn: 'init',
            // Arguments to the initializing function
            args: [],
            // Mark chaincode as confidential
            // confidential: true,
            // Assign Alice's cert
            metadata: userCert.encode(),
            chaincodePath: 'github.com/zmanian/bracketStore',
            certificatePath: '/certs/blockchain-cert.pem'
        };
        // Trigger the deploy transaction
        var deployTx = user.deploy(deployRequest);
        deployTx.on('complete', function (results) {
            return cb(null, results);
        });
        deployTx.on('error', function (err) {
            return cb(err);
        });
    });
}

function registerOwner(opts, user) {
    var args = new RegisterIdentityTX()

    args.OwnerName = opts.OwnerName
    args.PubKey = new Buffer(opts.Pubkey, 'hex');
    args.Signature = new Buffer(opts.Signature, 'hex');
    args.Data = opts.Data;

    return new Promise(function (resolve, reject) {
        invoke(user, 'registerOwner', args.encode().toString('hex'), function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

function registerThing(opts, user) {
    var args = new RegisterThingTX()

    args.Nonce = new Buffer(opts.Nonce, 'hex');
    // args.Identities = opts.Identities;
    args.Identities = []
    opts.Identities.forEach(function(o) {
        args.Identities.push(o);
    })
    console.log(opts.Identities)
    console.log(args.Identities)
    args.OwnerName = opts.OwnerName
    args.Signature = new Buffer(opts.Signature, 'hex');
    args.Data = opts.Data;
    args.Spec = opts.Spec;

    // var test = args.encode().toString('hex');

    return new Promise(function (resolve, reject) {
        invoke(user, 'registerThing', args.encode().toString('hex'), function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

function registerSpec(opts, user) {
    var args = new RegisterSpecTX()

    args.SpecName = opts.SpecName
    args.OwnerName = opts.OwnerName
    args.Signature = new Buffer(opts.Signature, 'hex');
    args.Data = opts.Data;

    return new Promise(function (resolve, reject) {
        invoke(user, 'registerSpec', args.encode().toString('hex'), function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

function owner(ownerName, user) {
    return new Promise(function (resolve, reject) {
        query(user, 'owner', ownerName, function (err, data, txid) {
            if (err) {
                reject(err);
            } else {
                resolve({ data: data, txid: txid });
            }
        });
    });
}

function thing(nonce, user) {
    return new Promise(function (resolve, reject) {
        query(user, 'thing', nonce, function (err, data, txid) {
            if (err) {
                reject(err);
            } else {
                resolve({ data: data, txid: txid });
            }
        });
    });
}

function spec(specName, user) {
    return new Promise(function (resolve, reject) {
        query(user, 'spec', specName, function (err, data, txid) {
            if (err) {
                reject(err);
            } else {
                resolve({ data: data, txid: txid });
            }
        });
    });
}

function notify(webhook, cb) {
    return webHooks.add(webhookname, webhook);
}

function query(user, func, args, cb) {
    if (!user)
        throw new Error('missing user');
    if (!func)
        throw new Error('missing func');

    user.getUserCert(null, function (err, userCert) {
        if (err) {
            return cb(err);
        }
        var queryRequest = {
            // Name (hash) required for query
            // Function to trigger
            fcn: func,
            // Parameters for the query function
            args: [args],
            chaincodeID: CHAINCODENAME,
            confidential: false,
            userCert: userCert
        };
        var queryTx = user.query(queryRequest);
        queryTx.on('complete', function (results) {
            return cb(null, results);
        });
        queryTx.on('error', function (err) {
            return cb(err);
        });
    });
}

function invoke(user, func, args, cb) {
    user.getUserCert(null, function (err, userCert) {
        if (err)
            return cb(err);
        var invokeRequest = {
            // Name (hash) required for invoke
            chaincodeID: CHAINCODENAME,
            // Function to trigger
            fcn: func,
            // Parameters for the invoke function
            args: [args],
            confidential: false,
            userCert: userCert
        };
        var meta = {
            txId: null
        };
        var invokeTx = user.invoke(invokeRequest);
        invokeTx.on('submitted', function (id) {
            console.log('invoke submitted');
            meta.txId = id.uuid;
        });
        invokeTx.on('complete', function (results) {
            console.log('invoke complete');
            return cb(null, results, meta);
        });
        invokeTx.on('error', function (err) {
            console.log('invoke error')
            return cb(err);
        });
    });
}

module.exports = {
    initialize:    initialize,
    registerOwner: registerOwner,
    registerThing: registerThing,
    registerSpec:  registerSpec,
    owner:         owner,
    thing:         thing,
    spec:          spec,
};
