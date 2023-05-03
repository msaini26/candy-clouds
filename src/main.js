/*

Name: Mansi Saini
Title: Candy Clouds
Time: 40+ hours approximately

5-Point Tier

✅ Track a high score that persists across scenes and display it in the UI (5)

✅ Implement the 'FIRE' UI text from the original game (5)

✅ Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)

✅ Implement the speed increase that happens after 30 seconds in the original game (5)

✅ Create a new scrolling tile sprite for the background (5)


10-Point Tier
✅ Display the time remaining (in seconds) on the screen (10)

✅ Create a new title screen (e.g., new artwork, typography, layout) (10)

✅ Implement parallax scrolling for the background (10)

15-Point Tier
✅ Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)

✅ Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)

✅ Implement mouse control for player movement and mouse click to fire (15)

*/


// set game configurations
let config = {
    type: Phaser.CANVAS, // init game canvas
    width: 640, // init width
    height: 480, // init height
    scene: [ Menu, GameControls, Play] // init menu and play scenes
}

let game = new Phaser.Game(config); // init new phaser game

// set UI sizes
let borderUISize = game.config.height / 15; // set UI height
let borderPadding = borderUISize / 3; // set padding around game frame

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT; 

// reserve mouse var
let mouse, mouseMove;