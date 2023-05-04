// initialize game controls class and inherit properties of phaser
class Rules extends Phaser.Scene {
    constructor() {
        super("rulesScene");
    }

    // preload assets
    preload() {
        // title screen background
        this.load.image('background', './assets/background/title_sky.png'); // sky background image
        this.load.spritesheet('stars', './assets/background/title_stars.png', {frameWidth: 640, frameHeight: 480, startFrame: 0, endFrame: 9});
    }

    // create objects and instances in phaser canvas
    create () {
        // display title image
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0); // place background tile sprite

        // animation config - stars sparkling
        this.anims.create({
            key: 'sparkle',
            frameRate: 6,
            frames: this.anims.generateFrameNumbers('stars'),
            repeat: -1,
            reverse: false
        });

        var stars = this.add.sprite(350, 400, 'stars');
        var more_stars = this.add.sprite(300, 150, 'stars');

        stars.play('sparkle');
        more_stars.play('sparkle');


        // set menu configurations
        let menuConfig = {
            fontFamily:'Helvetica', // set font
            fontStyle: 'bold', // bold font
            fontSize: '28px', // set font size
            backgroundColor: '#F3B141', // set score background color
            color: '#843605', // set text color
            align: 'center', // align score to the center
            padding: { // set padding around text
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0 // set max width
        };

        // title font configurations
        let titleConfig = {
            fontFamily: 'candy-shop', // set font
            fontSize: '68px',
            align: 'center',
        };

        // subtitle font configuration
        let subConfig = {
            fontFamily: 'chicken-pie',
            fontSize: '28px',
            align: 'center',
        };

        // paragraph font configuration
        let paragraphConfig = {
            fontFamily: 'comic-story',
            fontSize: '20px',
            align: 'center',
        };
        
       
        // goal text
        this.add.text(100, 140, "◉ GOAL:", subConfig).setOrigin(0, 0);
        this.add.text(210, 145, "Collect as many candies as you can", paragraphConfig).setOrigin(0, 0);
        this.add.text(210, 175, "before the timer runs out", paragraphConfig).setOrigin(0, 0);
        this.add.text(210, 205, "(60 seconds to start)", paragraphConfig).setOrigin(0, 0);
        // avoid text
        this.add.text(100, 250, "◉ Points & Timer:", subConfig).setOrigin(0, 0);
        this.add.text(200, 300, "◉  +10 pts for normal candies", paragraphConfig).setOrigin(0, 0);
        this.add.text(200, 330, "◉  +30 pts for gummy bear", paragraphConfig).setOrigin(0, 0);
        this.add.text(200, 360, "◉  +5 secs for candies", paragraphConfig).setOrigin(0, 0);
        this.add.text(200, 390, "◉  -20 secs for egg", paragraphConfig).setOrigin(0, 0);

    
        //directions to start
        menuConfig.color = '#ba5407';
        this.add.text(380, 435, 'Press → to continue', paragraphConfig).setOrigin(0);


        




     
        // show rules title
        var title = this.add.text(game.config.width/6, game.config.height/7 - borderUISize - borderPadding, 'Rules', titleConfig);

        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    // updates per frame
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // play game with arrow keys
            this.scene.start('controlsScene');
        }
    }
}