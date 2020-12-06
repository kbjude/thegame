import Phaser from 'phaser';
import config from '../config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.sndEfect();
    const credits = 'Credits            Author: Jude Kajura';
    // this.menuButton = new Button(this, config.midx, config.midy + 170, 'Menu', 'Title');
    this.creditsText = this.add.text(config.width, config.height / 2, credits, { fontSize: '32px', fill: '#fff' });
  }

  update() {
    this.creditsText.x -= 4;
    if (this.creditsText.x < -2000) this.creditsText.x = config.width;
  }

  sndEfect() {
    this.sfx = {
      life: this.sound.add('sndLife'),
    };
    this.sfx.life.play();
  }
}