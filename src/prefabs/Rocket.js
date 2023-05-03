// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this); // add to existing, displayList, updateList
        this.isFiring = false; // track rocket's firing status
        this.moveSpeed = 10; // pixels per frame

        // add rocket sfx
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    // update rocket per frame
    update() {

        // using arrow keys to launch rocket
        if(!this.isFiring & !mouseMove) {
            if (keyLEFT.isDown && this.x >= borderUISize + this.width) { // move player left
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) { // move player right
                this.x += this.moveSpeed; 
            }
        }

        // mouse movement to launch rocket
        if (!this.isFiring && mouseMove) {
            if (mouse.x >= borderUISize + this.width/2 && mouse.x <= game.config.width - borderUISize - this.width/2) {
                this.x = mouse.x; // set mouse movement along x axis
            }
        }

        // fire button
        // (f) key to fire
        if(!mouseMove && Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play(); // play sfx
        }
        // click mouse to fire
        if (mouseMove && mouse.isDown && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play(); // play sfx
        }

        // if fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed; // move firing icon up
        }
        // reset on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding - 40;
        }
    }

    // resets rocket to "ground"
    // Inputs: None
    // Outputs: None, just reset rocket
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding - 40;

        // need to reset mouse location with mouse use
        if (mouseMove) {
            this.x = mouse.x;
        }
    }
}