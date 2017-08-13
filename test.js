var probe = require('./lib/probe');
probe.probe({cacheDuration: 60000 * 5},function(device, updated){
    console.log( (updated ? "updated: " : "discovered: ") + device.mac + " - BSSID: " + device.bssid + " - " + device.probe + " -  " + (device.oui ? device.oui.name : ""));
});
