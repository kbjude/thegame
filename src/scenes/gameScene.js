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
    this.add.image(400, 300, 'person');
  }
}