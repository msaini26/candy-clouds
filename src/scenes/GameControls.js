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
            fontFamily: 'chicken-pie',
            fontSize: '28px',
            align: 'center',
        };

        // paragraph font configuration
        let paragraphConfig = {
            fontFamily: 'comic-story',
            fontSize: '18px',
            align: 'center',
        };
        
        //keyboard background cloud
        this.add.rectangle(125, 157, 140, 48, 0xe7d3ea).setOrigin(0, 0);
        this.add.circle(150, 160, 18, "0xe7d3ea"); 
        this.add.circle(180, 150, 22, "0xe7d3ea"); 
        this.add.circle(210, 150, 12, "0xe7d3ea"); 
        this.add.circle(237, 155, 17, "0xe7d3ea"); 
        this.add.circle(125, 157, 24, 0xe7d3ea).setOrigin(0.5, 0);
        this.add.circle(265, 157, 24, 0xe7d3ea).setOrigin(0.5, 0);
        this.add.text(200, 180, 'Keyboard', subConfig).setOrigin(0.5); // keyboard title
  
        // mouse background cloud  
        this.add.rectangle(400, 157, 140, 48, 0xe7d3ea).setOrigin(0, 0);
        this.add.circle(430, 160, 18, "0xe7d3ea"); 
        this.add.circle(460, 150, 22, "0xe7d3ea"); 
        this.add.circle(490, 150, 12, "0xe7d3ea"); 
        this.add.circle(517, 155, 17, "0xe7d3ea"); 
        this.add.circle(405, 157, 24, 0xe7d3ea).setOrigin(0.5, 0); // left circle
        this.add.circle(540, 157, 24, 0xe7d3ea).setOrigin(0.5, 0); // right circle
        this.add.text(475, 180, 'Mouse', subConfig).setOrigin(0.5); // mouse title

    
        // keyboard controls background
        this.add.rectangle(71, 230.5, 250, 10, 0xd9d5e7).setOrigin(0, 0);
        this.add.rectangle(71, 399.5, 250, 10, 0xd9d5e7).setOrigin(0, 0);
        this.add.circle(73.5, 230.5, 10, 0xd9d5e7); // top left rounder
        this.add.circle(320, 241, 10, 0xd9d5e7); // top right rounder
        this.add.circle(73.5, 409.55, 10, 0xd9d5e7); // bottom left rounder
        this.add.circle(320, 399.2, 10, 0xd9d5e7); // bottom right rounder
        this.add.text(60, 285, '◉  Use ←→ arrows to move', paragraphConfig).setOrigin(0);
        this.add.text(60, 315, '     & (F) to fire', paragraphConfig).setOrigin(0);

         // mouse controls background
         this.add.rectangle(360, 230.5, 210, 10, 0xd9d5e7).setOrigin(0, 0);
         this.add.rectangle(360, 399.5, 210, 10, 0xd9d5e7).setOrigin(0, 0);
         this.add.circle(364.5, 230.5, 10, 0xd9d5e7); // top left rounder
         this.add.circle(568, 241, 10, 0xd9d5e7); // top right rounder
         this.add.circle(364.5, 409.55, 10, 0xd9d5e7); // bottom left rounder
         this.add.circle(568, 399.2, 10, 0xd9d5e7); // bottom right rounder
         this.add.text(360, 285, '◉  Use mouse to move', paragraphConfig).setOrigin(0);
         this.add.text(360, 315, '      & (click) to fire', paragraphConfig).setOrigin(0);
 
      
        //directions to start
        menuConfig.color = '#ba5407';
        this.add.text(105, 365, 'Press ← to start', paragraphConfig).setOrigin(0);
        this.add.text(380, 365, 'Press → to start', paragraphConfig).setOrigin(0);


        




     
        // show game controls title
        var title = this.add.text(game.config.width/6, game.config.height/7 - borderUISize - borderPadding, 'Game Controls', titleConfig);

        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';

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