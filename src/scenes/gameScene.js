import Phaser from 'phaser';


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('person', 'assets/person.png');

  }

  create() {
    this.player = this.add.image(400, 540, 'person');
    this.player.physics.add.sprite(100, 'person');
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const moveAmt = 200;
    this.player.setDisplayOrigin(2000);

    if (this.cursors.right.isDown) this.player.setVelocityX(moveAmt);
  }
}