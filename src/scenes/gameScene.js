import Phaser from 'phaser';
import Player, { ChaserShip, CarrierShip, GunShip } from './entities';
import button2 from '../assets/startButton.png';
import person from '../assets/person.png';
import sprExplosion from '../assets/sprExplosion.png';
import sprExplosion2 from '../assets/sprExplosion2.png';
import sprEnemy0 from '../assets/6B.png';
import sprEnemy2 from '../assets/7.png';
import sprEnemy3 from '../assets/8.png';
// import sndExplode0 from '../assets/explosion_somewhere_far.mp3';
import sndExplode1 from '../assets/3shot.wav';
import sndLaser from '../assets/explosion_somewhere_far.mp3';
import sndLaser1 from '../assets/rmusic.wav';
import sprBtnRestart from '../assets/restart-button.svg';
import sprBtnRestartHover from '../assets/verde.png';
import laser from '../assets/laser.png';


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
    this.load.spritesheet('sprExplosion2', sprExplosion2, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('sprEnemy0', sprEnemy0, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprEnemy2', sprEnemy2);
    this.load.spritesheet('sprEnemy3', sprEnemy3, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprLaserEnemy0', laser);
    this.load.image('sprLaserPlayer', laser);
    this.load.spritesheet('sprPlayer', laser, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('person', person);
    this.load.spritesheet('person', person, {
      frameWidth: 16,
      frameHeight: 16,
    });
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

    this.anims.create({
      key: 'personanima',
      frames: this.anims.generateFrameNumbers('person'),
      frameRate: 20,
      repeat: -1,
    });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('sndLaser'),
    };

    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Up);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Down);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Left);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Right);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback() {
        const enemy = new GunShip(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          0,
        );
        this.enemies.add(enemy);
      },
      callbackScope: this,
      loop: true,
    });
  }

  update() {
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
  }
}