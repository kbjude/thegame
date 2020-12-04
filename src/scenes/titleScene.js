import Phaser from 'phaser';
import config from '../config/config';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
  }

  create() {
    // Game
    this.sfx = {
      btnOver: this.sound.add('explosionf'),
      btnDown: this.sound.add('sndBtnDown'),
    };
    this.gameButton = this.add.sprite(400, 300, 'button').setInteractive();
    this.gameButton.scaleX = 1.5;
    this.gameButton.scaleY = 1.5;
    this.startButton = this.add.sprite(400, 530, 'start').setInteractive();
    this.startButton.scaleX = 2.5;
    this.startButton.scaleY = 2.5;
    this.centerButton(this.startButton, 1);

    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.startButton);
    this.startButton.on('pointerdown', (pointer) => {
      this.scene.start('Game');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('button');
      this.sfx.btnOver.play(); // play the button over sound
    }, this);


    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2, config.height / 2 - offset * 100, config.width, config.height),
    );
  }

  centerButtonText(gameText, startButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      startButton,
    );
  }
}