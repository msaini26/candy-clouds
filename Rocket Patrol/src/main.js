let config = {
    type: Phaser.CANVAS, // create game canvas
    width: 640, // set game width
    height: 480, // set game height
    scene: [Menu, Play] // load in both scenes
}

// init game
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;