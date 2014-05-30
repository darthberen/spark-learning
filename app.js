var Cylon = require('cylon');

// Initialize the robot
Cylon.robot({
    connection: { 
        name: "spark",
        adaptor: "voodoospark",
        accessToken: "5ec499728e3055ca676f0bd27607da384c8b9f8c",
        deviceId: "53ff71065075535128151787",
        module: "spark"
    },
    //device: { name: 'led', driver: 'led', pin: 'D1' },
    devices: [
        { name: 'led', driver: 'led', pin: 'D1' },
        { name: 'button', driver: 'button', pin: 'D0' }
    ],
    /*
    */

    work: function(my) {
        /*
        every((1).second(), function() {
            my.led.toggle()
        });
        */
        //console.log(my);
        /*
        my.button.on('push', function(mine) {
            console.log('PUSHED', mine);
        });
        */
        my.button.on('push', function() {
            console.log('PUSHED');
            my.led.toggle();
        });
        /*
        */
    }
}).start();
