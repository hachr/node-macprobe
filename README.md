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

    1. sudo apt-get install build-essential
    2. sudo apt-get install libssl-dev
    3. sudo apt-get install libnl-3-dev libnl-genl-3-dev
    4. git clone https://github.com/hachr/aircrack-ng
    5. cd aircrack-ng
    6. make sqlite=true
    7. sudo make install
    
### Running it

    1. sudo airmon-ng wlan0
    2. git clone https://github.com/hachr/node-macprobe
    3. cd node-macprobe
    4. sudo node test
    
    
