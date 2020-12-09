import Phaser from 'phaser';
import Player, { ChaserShip, GunShip } from './entities';
import CarrierShip from './entities';
import ScrollingBackground from './entities';
import sprExplosion from '../assets/sprExplosion.png';
import sprExplosion2 from '../assets/sprExplosion2.png';
import sprEnemy0 from '../assets/6B.png';
// import sndExplode0 from '../assets/explosion_somewhere_far.mp3';
import sndExplode1 from '../assets/3shot.wav';
import sndLaser from '../assets/explosion_somewhere_far.mp3';
import sndLaser1 from '../assets/rmusic.wav';
import sprBtnRestart from '../assets/restart-button.svg';
import sprBtnRestartHover from '../assets/verde.png';
import laser from '../assets/laser.png';
import sprBg0 from '../assets/sprBg0.png';
import scores from '../js/topScores';
import scoresAPI from '../js/scoresAPI';


export default class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  preload() {
  //   this.load.image('sprBg0', 'content/sprBg0.png');
  //   this.load.image('sprBg0', 'content/sprBg0.png');
  //   this.load.image('sprBg1', 'content/sprBg1.png');
    this.load.spritesheet('sprExplosion', sprExplosion, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image('sprBg0', sprBg0);

    // this.load.spritesheet('sprBg0', sprBg0, {
    //   frameWidth: 52,
    //   frameHeight: 52,
    // });

    this.load.spritesheet('sprExplosion2', sprExplosion2, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('sprEnemy0', sprEnemy0, {
      frameWidth: 16,
      frameHeight: 16,
    });
    // this.load.image('sprEnemy2', sprEnemy2);
    // this.load.spritesheet('sprEnemy3', sprEnemy3, {
    //   frameWidth: 16,
    //   frameHeight: 16,
    // });
    this.load.image('sprLaserEnemy0', laser);
    this.load.image('sprLaserPlayer', laser);
    this.load.spritesheet('sprPlayer', laser, {
      frameWidth: 16,
      frameHeight: 16,
    });
    // this.load.image('person', person);
    // this.load.spritesheet('person', person, {
    //   frameWidth: 16,
    //   frameHeight: 16,
    // });
    this.load.audio('sndExplode0', sndLaser);
    this.load.audio('sndExplode1', sndExplode1);
    this.load.audio('sndLaser', sndLaser);
    this.load.audio('sndLaser1', sndLaser1);
    // this.load.image('sprBtnPlay', 'content/sprBtnPlay.png');
    // this.load.image('sprBtnPlayHover', 'content/sprBtnPlayHover.png');
    // this.load.image('start', button2);
    this.load.image('sprBtnRestart', sprBtnRestart);
    this.load.image('sprBtnRestartHover', sprBtnRestartHover);
    // // this.load.image('sprBtnRestartDown', 'content/sprBtnRestartDown.png');

    // this.load.audio('sndBtnOver', '../assets/Ending.wav');
    // this.load.audio('sndBtnDown', 'content/sndBtnDown.wav');
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.backgrounds = [];
    for (let i = 0; i < 5; i++) { // create five scrolling backgrounds
      const bg = new ScrollingBackground(this, 'sprBg0', i * 10);
      this.backgrounds.push(bg);
    }

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'person',
    );

    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy3',
      frames: this.anims.generateFrameNumbers('sprEnemy3'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    });

    // this.anims.create({
    //   key: 'personanima',
    //   frames: this.anims.generateFrameNumbers('person'),
    //   frameRate: 20,
    //   repeat: -1,
    // });

    this.backgrounds = [];
    for (let i = 0; i < 5; i++) { // create five scrolling backgrounds
      const bg = new ScrollingBackground(this, 'sprBg0', i * 10);
      this.backgrounds.push(bg);
    }

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('sndLaser'),
    };

    this.backgrounds = [];
    for (let i = 0; i < 5; i++) { // create five scrolling backgrounds
      const bg = new ScrollingBackground(this, 'sprBg0', i * 10);
      this.backgrounds.push(bg);
    }

    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Up);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Down);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Left);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Right);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    if (this.keySpace.isDown) {
      this.player.setData('isShooting', true);
    } else {
      this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
      this.player.setData('isShooting', false);
    }

    this.player.setData('score', 0);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();
    this.bonusLifes = this.add.group();

    this.levelText = this.add.text(16, 8, `player: ${scores.user.user}`, { fontSize: '16px', fill: '#FFF' });
    this.levelText = this.add.text(16, 26, 'level: 1', { fontSize: '16px', fill: '#FFF' });
    this.livesText = this.add.text(16, 44, 'lifes: 3', { fontSize: '16px', fill: '#FFF' });
    this.scoreText = this.add.text(16, 62, 'score: 0', { fontSize: '16px', fill: '#FFF' });

    this.time.addEvent({
      delay: 1000,
      callback() {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0,
            );
          }
        } else {
          enemy = new CarrierShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(0.1, 10) * 0.1);
          this.enemies.add(enemy);
          this.addScore(1);
        }
      },
      callbackScope: this,
      loop: true,
    });
    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }

        enemy.explode(true);
        playerLaser.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead')
          && !enemy.getData('isDead')) {
        player.explode(false);
        enemy.explode(true);
        this.addScore(10);
        player.onDestroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead')
          && !laser.getData('isDead')) {
        player.explode(false);
        laser.destroy();
        this.addScore(200);
        player.onDestroy();
      }
    });
  }


  update() {
    this.enemies.getChildren().forEach(e => {
      e.update();
      if (e && e.y > this.game.config.height - 10) {
        e.onDestroy();
        e.destroy();
      }
    });

    this.enemyLasers.getChildren().forEach(e => {
      if (e && e.y > this.game.config.height - 10) e.destroy();
    });

    this.playerLasers.getChildren().forEach(e => {
      if (e && e.y < 10) e.destroy();
    });

    this.bonusLifes.getChildren().forEach(e => {
      e.update();
      if (e && e.y > this.game.config.height - 10) {
        e.destroy();
      }
    });

    if (!this.player.getData('isDead')) {
      this.player.update();

      if (this.cursors.up.isDown) {
        this.player.moveUp();
      } else if (this.cursors.down.isDown) {
        this.player.moveDown();
      }

      if (this.cursors.left.isDown) {
        this.player.moveLeft();
      } else if (this.cursors.right.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }
    } else {
      scores.score = this.getScore();
      (async () => { await scoresAPI.save(); })();
      this.scene.start('End');
    }


    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
            this.addScore(200);
          }

          enemy.destroy();
          this.addScore(200);
        }
      }
    }
    for (let i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }

  getScore() {
    return this.player.getData('score');
  }

  addScore(value) {
    if (!this.player.getData('isDead')) {
      const currentScore = this.getScore();
      const newScore = currentScore + value;
      this.player.setData('score', newScore);
      this.scoreText.setText(`score: ${newScore}`);
      scores.user.score = this.player.getData('score');
    }
  }

  getLifes() {
    return this.player.getData('lifes');
  }

  addLifes() {
    this.player.setData('lifes', this.getLifes() + 1);
    this.livesText.setText(`lifes: ${this.getLifes()}`);
    this.sfx.life.play();
    this.player.power();
  }

  removeLifes() {
    this.player.setData('lifes', this.getLifes() - 1);
    if (this.getLifes() >= 0) this.livesText.setText(`lifes: ${this.getLifes()}`);
  }

  getEnemies() {
    return this.player.getData('enemies');
  }

  addEnemies() {
    this.player.setData('enemies', this.getEnemies() + 1);
  }

  getLevel() {
    return this.player.getData('level');
  }

  levelUp() {
    this.player.setData('level', this.player.getData('level') + 1);
    this.levelText.setText(`level: ${this.player.getData('level')}`);
    this.sfx.level.play();
    this.player.power();
    this.addScore(100);
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }
}