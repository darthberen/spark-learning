//blink.js
var Cylon = require('cylon');

Cylon.robot({
  // change the port below to match whatever your Arduino is actually plugged into
  connection: { name: 'arduino', adaptor: 'firmata', port: '/dev/tty.usbmodem1411' },
  device: { name: 'led', driver: 'led', pin: 13 },

  work: function(my) {
    every((1).seconds(), function() {my.led.toggle()});
  }
});

Cylon.start();
