class Menu extends Phaser.Scene { // inherit game canvas
    constructor() {
        super('menuScene');
    }

    create() {
        this.add.text(20, 20, "Rocket Patrol Menu"); // init title text
        this.scene.start('playScene');
    }
}