import Phaser from 'phaser';
import '../style.css';
import imageone from '../assets/NewGameButton.png';
import button2 from '../assets/startButton.png';
import logo from '../assets/logo.jpg';
import person from '../assets/person.png';
import bullet from '../assets/bullet.jpg';
import sprEnemy2 from '../assets/7.png';
import sprEnemy3 from '../assets/8.png';
import sndBtnDown from '../assets/rmusic.wav';
import explosionSomewhere from '../assets/explosion_somewhere_far.mp3';
import normal from '../assets/normal_3.png';
import sprBg1 from '../assets/sprBg1.jpg';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    // add logo image
    this.add.image(400, 200, logo);
    // this.add.image(400, 400, person);
    this.add.image(400, 400, bullet);
    this.add.image(2, 2, sprEnemy2);
    this.add.image(16, 16, sprEnemy3);
    

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('button', imageone);
    this.load.image('start', button2);
    this.load.image('logo', logo);
    this.load.spritesheet('person', person, { frameWidth: 100, frameHeight: 100 });
    this.load.image('bullet', bullet);
    this.load.audio('sndBtnDown', sndBtnDown);
    this.load.audio('sndBtnOver', sndBtnDown);
    this.load.audio('explosionf', explosionSomewhere);
    this.load.image('secondStart', normal);
    this.load.image('sprBg1', sprBg1.jpg);
    // this.load.image('phaserLogo', 'assets/logo.png');
    // this.load.image('box', 'assets/ui/grey_box.png');
    // this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    // this.load.audio('bgMusic', ['assets/TownTheme.mp3']);
    this.load.image('sprEnemy2', sprEnemy2);
    this.load.image('sprEnemy3', sprEnemy3);
  }

  create() {
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.scene.start('Title');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}