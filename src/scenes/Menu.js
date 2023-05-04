// initialize menu class and inherit properties of phaser
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    // preload assets
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');

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
            padding: {
                top: 5,
                bottom: 5,
                right: 5,
                left: 5
            }
        };

        // subtitle font configuration
        let subConfig = {
            fontFamily: 'comic-story',
            fontSize: '28px',
            align: 'center',
        };

        // cloud background
        // top row clouds
        this.add.circle(145, 95, 50, "0xe7d3ea"); // top left circle
        this.add.circle(220, 60, 50, "0xe7d3ea"); 
        this.add.circle(380, 65, 40, "0xe7d3ea");
        this.add.circle(300, 85, 50, "0xe7d3ea");
        this.add.circle(460, 85, 50, "0xe7d3ea");

        // bottom row clouds
        this.add.circle(145, 145, 50, "0xe7d3ea"); // bottom left circle
        this.add.circle(225, 135, 50, "0xe7d3ea"); 
        this.add.circle(285, 155, 50, "0xe7d3ea"); 
        this.add.circle(365, 140, 50, "0xe7d3ea"); 
        this.add.circle(505, 155, 35, "0xe7d3ea"); 
        this.add.circle(435, 145, 60, "0xe7d3ea"); 


        this.add.circle(110, 120, 50, "0xe7d3ea"); // left circle
        this.add.circle(530, 105, 50, "0xe7d3ea"); // right circle
        this.add.rectangle(320, 115, 420, 100, "0xe7d3ea"); // rectangle middle
        
        // show menu text
        var title = this.add.text(game.config.width/6, game.config.height/4 - borderUISize - borderPadding, 'Candy Clouds', titleConfig);
        title.setShadow(4, 4, '#6b74bd');

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
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 61000
            }
            this.sound.play('sfx_select'); // play background music
            this.scene.start('rulesScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 46000
            }
            this.sound.play('sfx_select');
            this.scene.start('rulesScene');
        }
    }
}