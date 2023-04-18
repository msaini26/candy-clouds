// set game configurations
let config = {
    type: Phaser.CANVAS, // init game canvas
    width: 640, // init width
    height: 480, // init height
    scene: [ Menu, Play ] // init menu and play scenes
}

let game = new Phaser.Game(config); // init new phaser game

// set UI sizes
let borderUISize = game.config.height / 15; // set UI height
let borderPadding = borderUISize / 3; // set padding around game frame
