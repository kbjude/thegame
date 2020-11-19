import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('logo', 'assets/logo.jpg');
  }

  create() {
    this.add.image(400, 300, 'logo');
  }
}