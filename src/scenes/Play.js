// initialize play class and inherit properties of phaser
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    // preload assets
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/jar.png'); // player rocket image
        this.load.image('spaceship', './assets/spaceship.png'); // spaceship enemy image

        // background layer assets credit to craftpix.net
        // from their website, "You can download it absolutely for free and use it in your games for commercial purposes."
        this.load.image('starfield', './assets/background/sky.png'); // sky background image
        this.load.image('starry', './assets/background/stars_1.png'); // background stars
        this.load.image('fog', './assets/background/fog.png'); // fog background image
        this.load.image('clouds', './assets/background/cloud_smaller.png'); // clouds background image
        this.load.image('ground', './assets/background/ground.png'); // clouds background image
        this.load.image('candy', './assets/enemies/gummy-bear.png'); // speedy candy enemy
        this.load.image('twisted_candy', './assets/enemies/twisted_candy.png'); // twisted candy enemy
        this.load.image('beans', './assets/enemies/beans.png'); // jelly beans candy enemy
        this.load.image('egg', './assets/enemies/egg.png'); // egg (subtracts time)

        // load background music
        this.load.audio('background_music', './assets/background_music.mp3');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    // create objects and instances in phaser canvas
    create() {
        
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0); // place background tile sprite
        this.starry = this.add.tileSprite(0, 0, 640, 480, 'starry').setOrigin(0, 0); // stars background
        this.fog = this.add.tileSprite(0, 0, 640, 480, 'fog').setOrigin(0,0); // fog background
        this.clouds = this.add.tileSprite(0, -80, 640, 480, 'clouds').setOrigin(0,0); // clouds background
        this.ground = this.add.tileSprite(0, 90, 640, 480, 'ground').setOrigin(0,0); // ground background
         

        // green UI background
        this.add.rectangle(0, borderPadding, game.config.width, borderUISize, 0xb3c3cd).setOrigin(0, 0);
       
     
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding*5, 'rocket').setOrigin(0.5, 0); // place rocket in game canvas frame

        // add spaceships (x3)
        this.gummy = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 3.5, 'candy', 0, 30).setOrigin(0, 0);
        this.gummy.moveSpeed += 3;
        this.twisted_candy = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'twisted_candy', 0, 20).setOrigin(0, 0);
        this.egg = new Egg(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'egg', 0, 10).setOrigin(0, 0);
        this.beans = new Spaceship(this, borderUISize * 7, borderUISize * 4 + borderPadding * 2, 'beans', 0, 10).setOrigin(0, 0); 

        // speed enemies up
        var speedUp = this.time.addEvent({
            delay: 30000,                // ms
            callback: this.speedUp,
            //args: [],
            callbackScope: this,
            loop: true
        });

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F); 
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // define mouse
        mouse = this.input.mousePointer;

        // background music configurations
        let musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            loop: true,
            delay: 0,
        }

        // create sound instance
        var music = this.sound.add('background_music', musicConfig);
        music.play(musicConfig); // play music with config settings

        //animation config - ship explosion
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });        

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily:'chicken-pie', // set font
            fontSize: '28px', // set font size
            backgroundColor: '#e7c9ff', // set score background color
            color: '#FFFFFF', // set text color
            align: 'center', // align score to the center
            padding: { // set padding around text
                top: 5,
                bottom: 5,
            },
            fixedWidth: 70 // set max width
        }

        // display score
        let highScoreConfig = {
            fontFamily:'comic-story', // set font
            fontSize: '28px', // set font size
            backgroundColor: '#e7c9ff', // set score background color
            color: '#FFFFFF', // set text color
            align: 'center', // align score to the center
            padding: { // set padding around text
                top: 5,
                bottom: 5,
            },
            fixedWidth: 275 // set max width
        }

        // add score text
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);
        this.scoreLeft.setShadow(2, 2, '#6b74bd');
        // add high score text
        this.highScore = this.add.text(280 + borderUISize + borderPadding, borderUISize + borderPadding * 2, "High Score: " + localStorage.getItem('highscore'), highScoreConfig);
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            // display game over text in middle of screen
            this.add.text(game.config.width/2, game.config.height/2, 'Game Over', scoreConfig).setOrigin(0.5);
            // display restart game message in parallel with game over
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true; // end the game
        }, null, this);

         // display timer
         let clockConfig = {
            fontFamily:'chicken-pie', // set font
            fontSize: '28px', // set font size
            backgroundColor: '#e7c9ff', // set score background color
            color: '#FFFFFF', // set text color
            align: 'center', // align score to the center
            padding: { // set padding around text
                top: 5,
                bottom: 5,
            },
            fixedWidth: 50 // set max width
        };

        // display fire ui
        let fireConfig = {
            fontFamily:'chicken-pie', // set font
            fontSize: '28px', // set font size
            backgroundColor: '#e37fff', // set score background color
            color: '#fcf6fe', // set text color
            align: 'center', // align score to the center
            padding: { // set padding around text
                top: 5,
                bottom: 5,
                right: 5,
                left: 5
            },
            fixedWidth: 100 // set max width
        }

        // timer
        this.timer = this.add.text(borderUISize + borderPadding * 48, borderUISize + borderPadding * 35, 60, clockConfig);
        this.timer.setShadow(2, 2, '#6b74bd');
        clockConfig.fixedWidth = 0;

        //FIRE ui text
        scoreConfig.backgroundColor = '#e7c9ff';
        scoreConfig.color = '#fcf6fe';
        this.fireText = this.add.text(game.config.width/2.9, borderUISize * 2.3, 'FIRE', fireConfig).setOrigin(0.5);
        this.fireText.setVisible(false);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);    
        
    }

    // constant updates in game canvas
    update() {
       
        //display fire ui
        if(this.p1Rocket.isFiring){
            this.fireText.setVisible(true);
        } else{
            this.fireText.setVisible(false);
        }


        // timer
        this.timer.text = Math.floor(this.clock.getRemainingSeconds());

        
        // freeze all tile sprites when game is over - cancel out movement
        if (this.gameOver) {
            this.starfield.tilePositionX += 1.5; 
            this.clouds.tilePositionX += 1; 
            this.fog.tilePositionX += 0.25; 
            this.ground.tilePositionX += 0.5;
        }

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart(); // reset the scene
        }

        // check key input for menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        // update tile sprite horizontal scrolling
        this.starfield.tilePositionX -= 1.5; // create moving starfield background
        this.clouds.tilePositionX -= 1; // right - moving clouds
        this.fog.tilePositionX -= 0.25; // right - slower moving fog
        this.ground.tilePositionX -= 0.5; // right - moving ground

        
        if (!this.gameOver) {
            // update rocket class
            this.p1Rocket.update(); // update rocket sprite

            // update spaceships (x3)
            this.gummy.update();
            this.twisted_candy.update();
            this.beans.update(); // update 
            this.egg.update(); // update enemy egg
        }   

        // checks collisions
        if (this.checkCollision(this.p1Rocket, this.egg)) {
            this.p1Rocket.reset(); // reset rocket to "ground"
            this.shipExplode(this.egg); // reset egg position

        }
        if (this.checkCollision(this.p1Rocket, this.twisted_candy)) {
            this.p1Rocket.reset(); // reset rocket to "ground"
            this.shipExplode(this.twisted_candy); // reset twisted_candy position
        }
        if (this.checkCollision(this.p1Rocket, this.gummy)) {
            this.p1Rocket.reset(); // reset rocket to "ground"
            this.shipExplode(this.gummy); // reset gummy position
        }
        if (this.checkCollision(this.p1Rocket, this.beans)) {
            this.p1Rocket.reset(); // reset rocket to "ground"
            this.shipExplode(this.beans); // reset beans position
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

    // adds time to game clock if player hits a ship
    // Inputs: miliseconds
    // Output: nothing, just setting time
    addTime(miliseconds)  {
        this.clock.delay += miliseconds;
    }

    // remove time from game clock if player hits the egg
    // Inputs: miliseconds
    // Output: nothing, just setting time
    removeTime(miliseconds)  {
        this.clock.delay -= miliseconds;
    }

    // use explode automation when ship collides
    // Inputs: ship
    // Output: None, just display explosion animation
    shipExplode(ship) {
        if (ship != this.egg) {
            this.addTime(5000); // add extra time if player hits a ship
        }
        else if (ship == this.egg) {
            this.removeTime(10000); // remove time if player hits the egg
        }

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

        // credit: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/localstorage/
        // to understand how localStorage works


        // update high score if doesn't exist already
        if (localStorage.getItem('highscore' == null)) {
            localStorage.setItem('highscore', this.p1Score);
        }
        
        // update max score if greater than first item
        else if (this.p1Score > localStorage.getItem('highscore')) {
            localStorage.setItem('highscore', this.p1Score); // update score
            this.highScore.text = "High Score: " + localStorage.getItem('highscore'); // updates high score as you beat it
        }

        this.sound.play('sfx_explosion'); // play explosion sound effects
    }

    // speeds up ships
    // Inputs: None
    // Outputs: None, just speed up ships
    speedUp(){

        console.log("ships speeding up!");
        this.gummy.moveSpeed *= 1.5;
        this.twisted_candy.moveSpeed *= 1.5;
        this.egg.moveSpeed *= 1.5;
        this.beans.moveSpeed * 1.5; 
    
    }

}