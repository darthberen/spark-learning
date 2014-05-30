var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'arduino', adaptor: 'firmata', port: '/dev/tty.usbmodem1411' },
  devices: [
    { name: 'led', driver: 'led', pin: 8 },
    { name: 'button', driver: 'button', pin: 7 }
  ],

  work: function(my) {
    //every((1).seconds(), function() {my.led.toggle()});
    my.button.on('push', function() {
      console.log('pushed');
      my.led.toggle();
    });
    /*
    */
  }
});

Cylon.start();
