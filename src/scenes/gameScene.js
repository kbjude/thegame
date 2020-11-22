import Phaser from 'phaser';


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    // this.load.audio("sndExplode0", "content/sndExplode0.wav");
    // this.load.audio("sndExplode1", "content/sndExplode1.wav");
    // this.load.audio("sndLaser", "content/sndLaser.wav");
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
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(moveAmt);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-moveAmt);
    }
  }
}