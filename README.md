node-macprobe
=============

Introduction
------------
Probing for mac address of near by wifi enabled devices.  The parsing logic is generic but the pipe of data is from modified aircrack-ng version @ https://github.com/hachr/aircrack-ng.

The objective was to run this library (along w/ other good stuff :-) ) on a raspberry pi with a wifi dongle that has ralink chipset.  Ralink chipset supports monitor mode which is needed to pick up mac addresses.

Installation
------------

This is what I did to build on the pi.  It could be different on other platform or if you are missing dependencies.  Make sure to have your apt-get up-to-date.

### Dependencies

    1. sudo apt-get update 
    2. sudo apt-get install build-essential
    3. sudo apt-get install libssl-dev
    4. sudo apt-get install libnl-3-dev libnl-genl-3-dev
    5. git clone https://github.com/hachr/aircrack-ng
    6. cd aircrack-ng
    7. make sqlite=true (if you want to use airolib-ng, if not, omit it or set it to false)
    8. sudo make install

### More dependencies
    1. sudo apt-get install iw
    
### Running it

    1. sudo airmon-ng wlan0
    2. git clone https://github.com/hachr/node-macprobe
    3. cd node-macprobe
    4. sudo node test
    
    
