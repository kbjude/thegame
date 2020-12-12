# Shooter Game
![Screenshot](https://github.com/kbjude/thegame/blob/ft-shooter/src/assets/Screenshot%202020-12-12%20at%2018.43.18.png)

This is a game built using Javascript, it has a player and the player's ability to protect herself is by using bullets, dodging the ememy in all ways, running from those chasing her and many other options. The player has one life, once any of the enemies' bullets, or any other item comes in to contact with the player, the game will End. 

## Setting Up Locally
- To deploy this project locally, download or clone this repo.
- Install the dependencies to build the project
    * npm install
- Build the project with npm run build use the following command to start the development server :
    * npm run start
- When you make many changes use webpack on development mode:
    * npm run dev
- To run the test:
    * npm run testdev
    
## About the Game

### Acquiring points:
  - When you dodge the Enemy your points will be increased
  - Killing/destroying the enemy and any thing they have sent at you, will attract you more points.
  
### Death
  - Every time the player or the eneamy is hit by a laser, they will die
  - When a player comes in contact with any thing on the board, they will die
 
 ### Winning & Losing
  Every time you acquire enought points to take you to the book of fame then you have won
  
    #### Book of fame.
    The is a place where your score is compare against 4 more players, whoever wins will be on top of the others. Any of the players with a score that can keep them      in the book of fame have won.
    
    If you have not made it to the book of fame, you have lost.
    
 ### Enemies:
     We have atleast three kinds of enemies
     1. Chaser Ship
     This will chase the player once it is in close proximity with her until it collides with them. The only way to kill it is by the player being under it and fire       bullets/lasers upwards. Running away from it is not an option, it is faster than the player but also will expose you to other enemies. You can however dodge         it by giving it enough distance so that it doesnt recorgnise your presence.
     
     2. Carrier Ship
      Carrier ship will pop up unknowingly and will some times drop a bullet/laser or two. You need to watch out for it.
      
     3. Gunship
      These are the commonest enemies on the board, they will come from any direction and will fire bullets/lasers at any time. They will kill the player in two           ways. 
      - By firing lasers at the player.
      - Them actually colliding with the player. Once any of this happens the player will die.
      
      I will also talk about the enemy lasers which may not trigger any motion by them selves but by the 2 ships(Gunship and carrier ship). They are also a danger         to the player. When they are fired and they collide with the player. She will die.
      
      
 ### Playing the Game.
  - After starting the Game. The following keyboard buttons will do the following:
      SPACE: 
      This will be your shooting button. For rapid fire, hold it down with a long press, for a one at a time bullet release, press and release the button as many times as you want the bullet to be relesed.
      
      ARROW KEY LEFT:
      This will help the player move left with ease
      
      ARROW KEY RIGHT:
      This will allow the player to move to the right
      
      ARROW KEY UP:
      This will allow the player to move up
      
      ARROW KEY DOWN:
      This will allow the player to go down
      
 ### Game Over
      Once the Player is hit, the game will come to an, points summed up and registered to the book of fame or not

### Technologies Used

- HTML
- CSS
- Phaser

#### Live Version 
   - [ Netlify Live Link](https://shooter-game-jude.netlify.app)

### Contributors

👤 **Jude Kajura**

- GitHub: [@kbjude](https://github.com/kbjude)
- Twitter:[@balindakj](https://twitter.com/balindakj)
- LinkedIn: [kajura-jude](https://www.linkedin.com/feed/)
