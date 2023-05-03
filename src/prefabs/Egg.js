// Spaceship prefab
class Egg extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame); // inherit phaser functionalities
        scene.add.existing(this); // add to existing scene
        this.points = pointValue; // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed; // pixels per frame
    }

    // updates per frame
    update() {
        // move spaceship right
        this.x += this.moveSpeed;
        // wrap around from left edge to right edge
        if (this.x >= this.width * 10) {
            this.reset(); // reset spaceships
        }
    }

    // position reset
    // Inputs: None
    // Outputs: None, reset spaceship positions
    reset() {
        this.x = 0;
    }
}