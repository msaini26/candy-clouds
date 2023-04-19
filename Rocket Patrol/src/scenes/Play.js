// initialize play class and inherit properties of phaser
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    // preload assets
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }


    // create objects and instances in phaser canvas
    create() {
         // place tile sprite
         this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
       
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);    
       
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0); // place rocket in game canvas frame

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F); 
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily:'Inter', // set font
            fontSize: '28px', // set font size
            backgroundColor: '#F3B141', // set score background color
            color: '#843605', // set text color
            align: 'right', // align score to right side
            padding: { // set padding around text
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100 // set max width
        }
        // add score text
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(60000, () => {
            // display game over text in middle of screen
            this.add.text(game.config.width/2, game.config.height/2, 'Game Over', scoreConfig).setOrigin(0, 0);
        })
    }

    // constant updates in game canvas
    update() {
        // update tile sprite
        this.starfield.tilePositionX -= 4; // create moving starfield background
        // update rocket class
        this.p1Rocket.update();

        // update spaceships (x3)
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();

        // checks collisions
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset(); // reset rocket to "ground"
            this.shipExplode(this.ship03); // reset ship03 position
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset(); // reset rocket to "ground"
            this.shipExplode(this.ship02); // reset ship03 position
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset(); // reset rocket to "ground"
            this.shipExplode(this.ship01); // reset ship03 position
        }
        
    }

    // checks for object collisions
    // Inputs: rocket, ship
    // Output: boolean - based on if collided or not
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
            return true; // if rocket collides with ship
        } else {
            return false; // no collision
        }
    }

    // use explode automation when ship collides
    // Inputs: ship
    // Output: None, just display explosion animation
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode'); // play explode animation
        boom.on('animationcomplete', () => { // callback after anim completes
            ship.reset(); // reset ship position
            ship.alpha = 1; // make ship visible again
            boom.destroy(); // remove explosion sprite
        });

        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
    }
}