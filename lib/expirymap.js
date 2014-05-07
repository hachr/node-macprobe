
module.exports = ExpiryMap;

var ONE_MINUTE = 6000;

/**
 * expiry entry map with given expiration.
 * @param {number} expiration
 */
function ExpiryMap(expiration){
    this.map = {};
    this.expiration = expiration || ONE_MINUTE;
}

/**
 *
 * @param {string} key
 * @param {Object} value
 * @param {number=} expiration
 */
ExpiryMap.prototype.put = function(key, value, expiration){
    var expiry = expiration || this.expiration;
    var entry = {
        value:value,
        ttl:Date.now() + expiry
    };
    this.map[key] = entry;
    //TODO: low, consider going through and prune the map?
};
/**
 *
 * @param {string} key
 * @return {Object}
 */
ExpiryMap.prototype.get = function(key){
    var entry = this.map[key];
    if(entry && !expired(entry)){
        return entry.value;
    }
};

ExpiryMap.prototype.reset = function(){
    this.map = {};
};

/**
 * @param {Object} entry
 */
function expired(entry){
    if(!entry){
        return true;
    }
    
    if(!entry.ttl){
        return true;
    }

    if(entry.ttl < Date.now()){
        return true;
    }
    return false;
}
