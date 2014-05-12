var probe = require('./lib/probe');
probe.probe(function(device, updated){
    console.log( (updated ? "updated: " : "discovered: ") + device.mac + " - BSSID: " + device.bssid + " - " + device.probe);
});
