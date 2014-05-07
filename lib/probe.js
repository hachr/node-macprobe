var spawn = require('child_process').spawn;
var os = require('os');
var fs = require('fs');
var path = require('path');
var Receiver = require('./receiver');

var tmpDir = os.tmpdir();
var prefix = "macprobe";

//todo: may be use event instead of callback for the probe.
module.exports = {
    probe: probe
};

/**
 * create temp file
 * run the command
 * - check for mon0 ir prerequisite, if not launch, launch it
 * - run airodump-ng against mon0
 * try to probe it
 * - parse.
 */
function probe(callback){
    var file = path.join(tmpDir,prefix + Date.now());
    //TODO: write to file w/ -w flag and file if we want to dump the output to file for backup.
    
    var receiver = new Receiver();
    
    receiver.on('discovered', function(device){
        callback.call(null,device);
    });
    
    //TODO: externalize this cmd
    var pid = spawn('/home/pi/depot/aircrack-ng/src/airodump-ng', ['mon0', '--manufacturer','--ignore-negative-one','--berlin', '60', '--probe'], {});
    pid.stdout.on('data', function(data){
        console.log("STDOUT: " + data);
    });
    
    pid.stderr.on('data', function(data){
        receiver.receive(data);
    });
    
    pid.on('close',function(code){
        console.log("CLOSE: " + code);
    });
    
    pid.on('error', function(err){
        console.error("ERROR: " + err);
    });
}


