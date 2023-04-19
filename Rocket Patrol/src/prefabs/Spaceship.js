// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame); // inherit phaser functionalities
        scene.add.existing(this); // add to existing scene
        this.points = pointValue; // store pointValue
        this.moveSpeed = 3; // pixels per frame
    }

    // updates per frame
    update() {
        // move spaceship left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if (this.x <= 0 - this.width) {
            this.reset(); // reset spaceships
        }
    }

    // position reset
    // Inputs: None
    // Outputs: None, reset spaceship positions
    reset() {
        this.x = game.config.width;
    }
}