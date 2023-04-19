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
    }


    // create objects and instances in phaser canvas
    create () {
        this.add.text(20, 20, "Rocket Patrol Menu"); // display text
        this.scene.start("playScene"); // skip to play scene in beginning
    }
}