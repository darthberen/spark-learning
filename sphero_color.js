var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/tty.Sphero-RWY-AMP-SPP' },
  device: { name: 'sphero', driver: 'sphero' },

  work: function(me) {
    every((1).second(), function() {
      me.sphero.setRGB(Math.floor(Math.random() * 100000));
    });
  }
});

Cylon.start();
