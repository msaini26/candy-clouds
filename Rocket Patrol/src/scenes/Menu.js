// initialize menu class and inherit properties of phaser
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }


    // create objects and instances in phaser canvas
    create () {
        this.add.text(20, 20, "Rocket Patrol Menu"); // display text
        this.scene.start("playScene"); // skip to play scene in beginning
    }
}