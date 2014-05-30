//sphero_makey_button.js
var Cylon = require('cylon');
var time = 0;
var calibration = false;
 
 
Cylon.robot({
  connections: [
    { name: 'arduino', adaptor: 'firmata', port: '/dev/tty.usbmodem1411' },
    { name: 'sphero', adaptor: 'sphero', port: '/dev/tty.Sphero-RWY-AMP-SPP' }
  ],
  devices: [
    { name: 'sphero', driver: 'sphero', connection: 'sphero' },
    { name: 'forward', driver: 'makey-button', connection: 'arduino', pin: 6 },
    { name: 'back', driver: 'makey-button', connection: 'arduino', pin: 8 },
    { name: 'left', driver: 'makey-button', connection: 'arduino', pin: 7 },
    { name: 'right', driver: 'makey-button', connection: 'arduino', pin: 5 }
  ],
  checkCalibration: (function(_this) {
    return function(me) {
      if (calibration === true) {
        me.sphero.finishCalibration();
        calibration = false;
      }
    };
  })(this),
  work: function(my) {
    my.checkCalibration(my);
    my.sphero.setBackLED(255);
 
    my.forward.on('push', function() {
      console.log("forward");
      my.checkCalibration(my);
      my.sphero.roll(90, 0);
    });
    my.forward.on('release', function() {
      my.sphero.stop();
    });
 
    my.back.on('push', function() {
      console.log("back");
      my.checkCalibration(my);
      my.sphero.roll(90, 180);
    });
    my.back.on('release', function() {
      my.sphero.stop();
    });
 
    my.right.on('push', function() {
      console.log("right");
      var t = Date.now();
      if ((t - time) < 400 ) {
        console.log("Calibrating");
        my.sphero.startCalibration();
        calibration = true;
      } else {
        my.checkCalibration(my);
        my.sphero.roll(90, 90);
      }
      time = t;
    });
    my.right.on('release', function() {
      my.sphero.stop();
    });
 
    my.left.on('push', function() {
      console.log("left");
      my.checkCalibration(my);
      my.sphero.roll(90, 270);
    });
    my.left.on('release', function() {
      my.sphero.stop();
    });
  }
});

Cylon.start();
