import Phaser from 'phaser';
import config from './config/config';
import SceneMain from './scenes/gameScene';
import BootScene from './scenes/bootScene';
import PreloaderScene from './scenes/preloaderScene';
import TitleScene from './scenes/titleScene';
import OptionsScene from './scenes/optionsScene';
import CreditsScene from './scenes/creditScene';
import GameOver from './scenes/gameOver';
// import Entity from './scenes/entities';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', SceneMain);
    this.scene.add('End', GameOver);
    // this.scene.add('Entities', Entity);
    this.scene.start('Boot');
  }
}

window.game = new Game();