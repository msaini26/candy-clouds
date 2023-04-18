// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this); // add to existing, displayList, updateList
        this.isFiring = false; // track rocket's firing status
        this.moveSpeed = 2; // pixels per frame
    }

    // update rocket per frame
    update() {
        // left/right movement in game canvas
        if(!this.isFiring) {
            if (keyLEFT.isDown && this.x >= borderUISize + this.width) { // move player left
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) { // move player right
                this.x += this.moveSpeed; 
            }
        }

        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF)) {
            this.isFiring = true;
        }
        // if fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed; // move firing icon up
        }
        // reset on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }
}