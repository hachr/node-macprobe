var probe = require('./lib/probe');
probe.probe(function(device){
    console.log("discovered: " + device.mac);
});
