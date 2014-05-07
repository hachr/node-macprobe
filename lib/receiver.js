/**
 * Receive raw data from console.
 * determine the 'valid' frame which begins @ \33[1;1H and ends @ \33[J
 * emit the data frame, or queue them up, and emit ONLY the mac address along w/ metadata such as 'oui'
 */

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var ExpiryMap = require('./expirymap');

module.exports = Receiver;


function Receiver(){
    this.data = "";
    this.map = new ExpiryMap(12000); //2 minutes expiry
    EventEmitter.call(this);
}

util.inherits(Receiver, EventEmitter);

/**
 * @param {string} data
 */
Receiver.prototype.receive = function(data){
    this.data += data;
    var endIndicator = isComplete(this.data);
    if(endIndicator){
        //go through each line, parse and emit the individual data.
        var d = this.data.slice(this.data.indexOf('\33[1;1H') + 7,endIndicator + 1);
        //reset it
        if(d.length){
            var lines =  d.split('\n');
            //console.log(lines[0]); //should always be the header.
            //console.log(lines[1]); //should always be empty string
            for(var i=2;i<lines.length;i++){
                var line = lines[i];
                var bssid = line.slice(1,20).trim();
                var mac = line.slice(20, 39).trim();
                var power = line.slice(39,45).trim();
                var rate = line.slice(45,53).trim();
                var lost = Number(line.slice(53,59).trim());
                var frame = Number(line.slice(59,69).trim());
                var probe = line.slice(69).trim();    
                //TODO: oui

                //need to validate the mac
                if(!isValidMac(bssid) || !isValidMac(mac)){
                    continue;
                }
                
                var device = {
                    bssid: bssid,
                    mac: mac,
                    power: power,
                    rate: rate,
                    lost: lost,
                    frame: frame,
                    probe: probe
                }


                var entry = this.map.get(mac);
                if(!entry){
                    this.map.put(mac, device);
                    this.emit('discovered', device);
                }else{
                    //TODO: compare the entry & the device, frame count is probably updated.
                    
                }
            }
            this.data = "";
        }
    }
};

function isValidMac(mac){
    return /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(mac);
}

//search for the end indicator.
function isComplete(data){
    return data.lastIndexOf('\33[J');
}