import Phaser from 'phaser';


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images

  }

  create() {
    this.player = this.physics.add.sprite(400, 530, 'person');
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const moveAmt = 200;

    if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(moveAmt);
    } else if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-moveAmt);
    }
  }
}