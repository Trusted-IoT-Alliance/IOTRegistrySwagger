var fs = require('fs')
var config = require('./config.js');
var docproofware = require('../index.js');


docproofware.initialize(config.members, config.peer, config.events, config.creds, null, config.chaincodeName, function(err, user) {
    if (user){
        console.log('Success'); 
        process.exit(0);
    }
    else {
        console.log(err);
        process.exit(0);
    }
});
