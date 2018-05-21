"use strict";


class Characters {

  constructor(x, y, speed, sprite) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = sprite;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Enemies our player must avoid
class Enemy extends Characters {

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.x > 550) {
      this.x = -100;
      this.speed = 100 + Math.floor(Math.random() * 222);
    }

    // Check for collision between player and enemies
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
          player.x = 202;
          player.y = 405;
        }
  }

  // Draw the enemy on the screen, required method for game
  render() {
    super.render();
  }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Characters {

  update() {

  }

  render() {
    super.render();
  }

  handleInput(keyPressed) {
    if (keyPressed == 'left' && this.x > 0) {
      this.x -= 102;
    }

    if (keyPressed == 'right' && this.x < 405) {
      this.x += 102;
    }

    if (keyPressed == 'up' && this.y > 0) {
      this.y -= 83;
    }

    if (keyPressed == 'down' && this.y < 405) {
      this.y += 83;
    }


    if (this.y < 0) {
      setTimeout(function () {
        alert("Great! You reached a water! You won!");
        player.x = 202;
        player.y = 405;
        }, 600);
    }
  }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];

// Position "y" where the enemies will are created
const enemyPosition = [60, 140, 220];
const player = new Player(200, 380, 50, 'images/char-cat-girl.png');
let enemy;

enemyPosition.forEach(function (posY) {
    enemy = new Enemy(0, posY, 200, 'images/enemy-bug.png');
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
