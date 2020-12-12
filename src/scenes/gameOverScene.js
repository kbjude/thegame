/* eslint-disable no-plusplus */
/* eslint-disable func-names */
import Phaser from 'phaser';


// eslint-disable-next-line import/no-named-as-default
import ScrollingBackground from './entities';
import scoresAPI from './scoresAPI';
import scores from './topScores';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('End');
  }

  // eslint-disable-next-line class-methods-use-this
  preload() {
  }

  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.sfx = {
      btnOver: this.sound.add('explosionf'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'restart',
    );

    this.btnRestart.setInteractive();

    this.btnRestart.on('pointerover', function () {
      this.btnRestart.setTexture('restart'); // set the button texture to sprBtnPlayHover
      this.sfx.btnOver.play(); // play the button over sound
    }, this);

    this.btnRestart.on('pointerout', function () {
      this.setTexture('restart');
    });

    this.btnRestart.on('pointerdown', function () {
      this.btnRestart.setTexture('restart');
      this.scene.start('Game');
    }, this);

    this.btnRestart.on('pointerup', function () {
      this.btnRestart.setTexture('restart');
    }, this);

    this.backgrounds = [];
    for (let i = 0; i < 5; i++) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }

    this.userNameText = this.add.text(210, 400, `${scores.user.user}`, { fontSize: '16px', fill: '#FFF' });
    this.finalScoreText = this.add.text(210, 420, `score: ${scores.user.score}`, { fontSize: '16px', fill: '#FFF' });

    scoresAPI.gettop()
      .then(() => {
        if (scores.user.score >= scores.topscores[4].score) {
          this.add.text(100, 400, 'Congrats, you are in top 4!', { fontSize: '16px', fill: '#FFF' });
          this.sfx.life.play();
          scoresAPI.save();
        } else {
          this.add.text(90, 450, 'Too low to be saved sorry!!!', { fontSize: '16px', fill: '#FFF' });
        }
      });
    this.add.text(160, 200, '5 Highest Scores', { fontSize: '16px', fill: '#FFF' });

    scoresAPI.gettop()
      .then(() => {
        let tab = 0;
        scores.topscores.forEach(element => {
          this.add.text(160, 260 + tab, `${tab / 24 + 1}.- ${element.user}: ${element.score}`, { fontSize: '16px', fill: '#FFF' });
          tab += 24;
        });
      })
      .catch(e => this.add.text(16, 300, e, { fontSize: '16px', fill: '#FFF' }));
  }


  update() {
    for (let i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
}