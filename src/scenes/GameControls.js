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

        // paragraph font configuration
        let paragraphConfig = {
            fontFamily: 'comic-story',
            fontSize: '28px',
            align: 'center',
        };
        
        //keyboard title
        this.add.rectangle(125, 157, 140, 48, 0xe7d3ea).setOrigin(0, 0);
        this.add.circle(150, 160, 18, "0xe7d3ea"); 
        this.add.circle(180, 150, 22, "0xe7d3ea"); 
        this.add.circle(210, 150, 12, "0xe7d3ea"); 
        this.add.circle(237, 155, 17, "0xe7d3ea"); 
        this.add.circle(125, 157, 24, 0xe7d3ea).setOrigin(0.5, 0);
        this.add.circle(265, 157, 24, 0xe7d3ea).setOrigin(0.5, 0);
        this.add.text(200, 180, 'Keyboard', subConfig).setOrigin(0.5);
  
        // mouse background cloud  
        this.add.rectangle(370, 157, 140, 48, 0xe7d3ea).setOrigin(0, 0);
        this.add.circle(400, 160, 18, "0xe7d3ea"); 
        this.add.circle(430, 150, 22, "0xe7d3ea"); 
        this.add.circle(460, 150, 12, "0xe7d3ea"); 
        this.add.circle(487, 155, 17, "0xe7d3ea"); 
        this.add.circle(375, 157, 24, 0xe7d3ea).setOrigin(0.5, 0); // left circle
        this.add.circle(510, 157, 24, 0xe7d3ea).setOrigin(0.5, 0); // right circle
        // mouse text
        this.add.text(445, 180, 'Mouse', subConfig).setOrigin(0.5);

    
  
        




     
        // show menu text
        var title = this.add.text(game.config.width/6, game.config.height/7 - borderUISize - borderPadding, 'Game Controls', titleConfig);


        this.add.text(game.config.width/2, game.config.height/1.5, 'Use ←→ arrows to move & (F) to fire', paragraphConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/1.5 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', paragraphConfig).setOrigin(0.5);

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