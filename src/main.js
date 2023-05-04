/*

Name: Mansi Saini
Title: Candy Clouds
Time: 30+ hours approximately

5-Point Tier

✅ Track a high score that persists across scenes and display it in the UI (5)
    - high score is on the top right of the screen

✅ Implement the 'FIRE' UI text from the original game (5)
    - 'FIRE' UI text is in between score and high score when the player is firing

✅ Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
     - background music was in the play screen

✅ Implement the speed increase that happens after 30 seconds in the original game (5)
     - after 30 seconds, the game speeds up

✅ Create a new scrolling tile sprite for the background (5)
    - implemented sunset background


10-Point Tier
✅ Display the time remaining (in seconds) on the screen (10)
    - time remaining is visible on bottom left of play screen

✅ Create a new title screen (e.g., new artwork, typography, layout) (10)
    - candy clouds home page and controls page to teach player controls
    - (bonus: added controls and rules pages of game)

✅ Implement parallax scrolling for the background (10)
    - fog moves at a different speed than the clouds and the ground

15-Point Tier
✅ Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
    - gummy bear is flying so fast on the left

✅ Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)
    - adds 5ish seconds for each successful hit
        (bonus: added an enemy egg that decreases the time left if you hit it - 20 seconds)

✅ Implement mouse control for player movement and mouse click to fire (15)
     - choose mouse control in the controls menu before continuing into the game

    credit: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/localstorage/
    to understand how localStorage works

    credit: background layer assets credit to craftpix.net
    from their website, "You can download it absolutely for free and use it in your games for commercial purposes."
     

*/


// set game configurations
let config = {
    type: Phaser.CANVAS, // init game canvas
    width: 640, // init width
    height: 480, // init height
    scene: [Menu, Rules,  GameControls, Play] // init menu and play scenes
}

let game = new Phaser.Game(config); // init new phaser game

// set UI sizes
let borderUISize = game.config.height / 15; // set UI height
let borderPadding = borderUISize / 3; // set padding around game frame

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT; 

// reserve mouse var
let mouse, mouseMove;