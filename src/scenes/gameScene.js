import Phaser from 'phaser';
import Player from './entities';
import button2 from '../assets/startButton.png';
import person from '../assets/person.png';
import sprExplosion from '../assets/sprExplosion.png';
import sprExplosion2 from '../assets/sprExplosion2.png';
import sprEnemy0 from '../assets/6B.png';


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
    this.load.image('sprEnemy2', '../assets/7.png');
    this.load.spritesheet('sprEnemy3', '../assets/8.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    //   this.load.image('sprLaserEnemy0', 'content/sprLaserEnemy0.png');
    this.load.image('person', person);
    this.load.spritesheet('person', person, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.audio('sndExplode0', '../assets/DeathFlash.flac');
    this.load.audio('sndExplode1', '../assets/3shot.wav');
    this.load.audio('sndLaser', '../assets/explosion_somewhere_far.mp3');
    this.load.audio('sndLaser', '../assets/rumble.flac');
    // this.load.image('sprBtnPlay', 'content/sprBtnPlay.png');
    // this.load.image('sprBtnPlayHover', 'content/sprBtnPlayHover.png');
    // this.load.image('start', button2);
    this.load.image('sprBtnRestart', '../assets/restart-button.svg');
    this.load.image('sprBtnRestartHover', '../assets/verde.png');
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

    // this.anims.create({
    //   key: 'sprEnemy0',
    //   frames: this.anims.generateFrameNumbers('sprEnemy0'),
    //   frameRate: 20,
    //   repeat: -1,
    // });

    // this.anims.create({
    //   key: 'sprEnemy2',
    //   frames: this.anims.generateFrameNumbers('sprEnemy2'),
    //   frameRate: 20,
    //   repeat: -1,
    // });

    // this.anims.create({
    //   key: 'sprEnemy3',
    //   frames: this.anims.generateFrameNumbers('sprEnemy3'),
    //   frameRate: 20,
    //   repeat: -1,
    // });

    // this.anims.create({
    //   key: 'sprExplosion',
    //   frames: this.anims.generateFrameNumbers('sprExplosion'),
    //   frameRate: 20,
    //   repeat: 0,
    // });

    // this.anims.create({
    //   key: 'personanima',
    //   frames: this.anims.generateFrameNumbers('person'),
    //   frameRate: 20,
    //   repeat: -1,
    // });

    // this.sfx = {
    //   explosions: [
    //     this.sound.add('sndExplode0'),
    //     this.sound.add('sndExplode1'),
    //   ],
    //   laser: this.sound.add('sndLaser'),
    // };

    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Up);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Down);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Left);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Right);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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