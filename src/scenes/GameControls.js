// initialize game controls class and inherit properties of phaser
class GameControls extends Phaser.Scene {
    constructor() {
        super("controlsScene");
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
            fontFamily: 'comic-story',
            fontSize: '28px',
            align: 'center',
        };

     
        // show menu text
        this.add.text(game.config.width/6, game.config.height/4 - borderUISize - borderPadding, 'Game Controls', titleConfig);


        this.add.text(game.config.width/2, game.config.height/1.5, 'Use ←→ arrows to move & (F) to fire', subConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/1.5 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', subConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    // updates per frame
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // play game with arrow keys
            mouseMove = false;
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // play game with mouse
            mouseMove = true;
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}