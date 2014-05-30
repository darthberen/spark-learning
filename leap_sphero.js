var Cylon = require('cylon');
var calibration = true;

Cylon.robot({
  connections: [
    { name: 'leapmotion', adaptor: 'leapmotion', port: '127.0.0.1:6437' },
    { name: 'sphero', adaptor: 'sphero', port: '/dev/tty.Sphero-RWY-AMP-SPP' }
  ],
  devices: [
    { name: 'leapmotion', driver: 'leapmotion', connection: 'leapmotion' },
    { name: 'sphero', driver: 'sphero', connection: 'sphero' }
  ],
/*
  work: function(my) {
    my.leapmotion.on('hand', function(hand) {
      var r = hand.palmY.fromScale(100, 600).toScale(0, 255) | 0;
      my.sphero.setRGB(r, 0, 0);
    });
  }
  */
  // X: right/left lengthwise on leap (-200, 200)
  // Y: up/down " (50, 300)
  // Z: back/foward " (-200, 200)
  checkCalibration: (function(_this) {
    return function(me) {
      if (calibration === true) {
        me.sphero.finishCalibration();
        calibration = false;
      }
    };
  })(this),
  work: function(my) {
    my.sphero.startCalibration();
    my.checkCalibration(my);
    my.sphero.setBackLED(255);
    //my.sphero.roll(60, 0);

    my.leapmotion.on('hand', function(data) {

      var speed = data.palmY.fromScale(50, 300).toScale(0, 100) | 0;
      var forward = data.palmZ.fromScale(-200, 200).toScale(-1000, 1000) | 0;
      forward *= -1;
      var sideways = data.palmX.fromScale(-200, 200).toScale(-1000, 1000) | 0;
      console.log(data.toString());
      var angle = Math.atan2(forward, sideways) * (180 / Math.PI);
      angle += 90;
      if (angle < 0) {
        angle += 360;
      } else if (angle > 360) {
        angle = angle % 360
      }
      angle = Math.floor(angle);
      console.log('Speed:', speed, '| forward:', forward, '| sideways:', sideways, '| angle:', angle);
      my.sphero.roll(speed, angle);
      //my.sphero.setHeading(angle);
    });
  }
})

Cylon.start();
