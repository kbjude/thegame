import Phaser from 'phaser';
import Entities from './entities';
import button2 from '../assets/startButton.png';
import person from '../assets/person.png';


export default class SceneMain extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
  //   this.load.image('sprBg0', 'content/sprBg0.png');
  //   this.load.image('sprBg0', 'content/sprBg0.png');
  //   this.load.image('sprBg1', 'content/sprBg1.png');
  //   this.load.spritesheet('sprExplosion', 'content/sprExplosion.png', {
  //     frameWidth: 32,
  //     frameHeight: 32,
  //   });
  //   this.load.spritesheet('sprEnemy0', 'content/sprEnemy0.png', {
  //     frameWidth: 16,
  //     frameHeight: 16,
  //   });
  //   this.load.image('sprEnemy1', 'content/sprEnemy1.png');
  //   this.load.spritesheet('sprEnemy2', 'content/sprEnemy2.png', {
  //     frameWidth: 16,
  //     frameHeight: 16,
  //   });
  //   this.load.image('sprLaserEnemy0', 'content/sprLaserEnemy0.png');
    this.load.image('person', person);
    this.load.spritesheet('person', person, {
      frameWidth: 16,
      frameHeight: 16,
    });
    // this.load.audio('sndExplode0', 'content/sndExplode0.wav');
    // this.load.audio('sndExplode1', 'content/sndExplode1.wav');
    // this.load.audio('sndLaser', 'content/sndLaser.wav');
        // this.load.image('sprBtnPlay', 'content/sprBtnPlay.png');
    // this.load.image('sprBtnPlayHover', 'content/sprBtnPlayHover.png');
    // this.load.image('start', button2);
    // this.load.image('sprBtnRestart', 'content/sprBtnRestart.png');
    // this.load.image('sprBtnRestartHover', 'content/sprBtnRestartHover.png');
    // this.load.image('sprBtnRestartDown', 'content/sprBtnRestartDown.png');

    // this.load.audio('sndBtnOver', 'content/sndBtnOver.wav');
    // this.load.audio('sndBtnDown', 'content/sndBtnDown.wav');
  }

  create() {
    this.gameText = this.add.text(0, 0, 'Testing', { fontSize: '32px', fill: '#fff' });
    this.player = this.physics.add.sprite(200, 200, 'person');
    this.add.image(200, 200, 'person');
    this.player = new Entities.Player(
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

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    this.player.update();

    if (this.keyW.isDown) {
      this.player.moveUp();
    } else if (this.keyS.isDown) {
      this.player.moveDown();
    }

    if (this.keyA.isDown) {
      this.player.moveLeft();
    } else if (this.keyD.isDown) {
      this.player.moveRight();
    }
  }
}