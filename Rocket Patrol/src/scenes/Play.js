class Play extends Phaser.Scene { // inherit game canvas
    constructor() {
        super('playScene');
    }

    create() {
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2);
    }
}