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
    }


    // create objects and instances in phaser canvas
    create () {
        // display title image
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0); // place background tile sprite


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
        // TODO: fix circle
        // this.circle = this.add.circle(game.config.width/2, game.config.height/4 - borderUISize - borderPadding)
        this.add.text(game.config.width/6, game.config.height/4 - borderUISize - borderPadding, 'Candy Clouds', titleConfig);

        // this.add.text(game.config.width/2, game.config.height/4 - borderUISize - borderPadding, 'CANDY CLOUDS', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', subConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', subConfig).setOrigin(0.5);

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
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 46000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}