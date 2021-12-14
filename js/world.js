import Hero from "./hero.js";
import Enemy from "./enemy.js";
import * as U from "./utils.js";

export class World {
  gameBoard = document.querySelector("#game");
  score = 0;
  hero;
  demon;
  previousTimestamp = 0;
  message = document.querySelector("#message");
  restartButton = document.querySelector("#restart");
  winScore = document.querySelector("#win");
  lostScore = document.querySelector("#loss");

  constructor() {
    this.hero = new Hero(this.gameBoard);
    this.demon = new Enemy(this.gameBoard);
    this.winScore.textContent = `Win: ${this.score}`;
    this.lostScore.textContent = `Loss: ${this.score}`;
    this.restartButton.addEventListener("click", () => {
      location.reload();
    });
    window.requestAnimationFrame(() => this.loop());
  }

  heroMovement() {
    Object.keys(this.hero.keysDown).forEach((key) => {
      if (this.hero.keysDown[key]) {
        switch (key) {
          case "ArrowUp":
            this.hero.moveTop();
            break;
          case "ArrowDown":
            this.hero.moveDown();
            break;
          case "ArrowLeft":
            this.hero.moveLeft();
            break;
          case "ArrowRight":
            this.hero.moveRight();
            break;
          case "x":
            this.heroStrike();
            break;
          case "c":
            this.heroHealth();
            break;
        }
        this.hero.render();
      }
    });
  }

  heroStrike() {
    if (U.isCollision(this.hero, this.demon)) {
      this.demon.hp = this.hero.heroAttack(this.demon.hp);
      this.demon.hpBar.value = `${this.demon.hp}`;
    }
  }

  demonStrike() {
    this.hero.hp = this.demon.demonAttack(this.hero.hp);
    this.hero.hpBar.value = `${this.hero.hp}`;
  }

  heroHealth() {
    if (U.isCollision(this.hero, this.demon)) {
      this.hero.heroHealing();
      this.hero.hpBar.value = `${this.hero.hp}`;
    }
  }

  demonHealth() {
    if (U.isCollision(this.hero, this.demon)) {
      if (this.hero.hp > 0 || this.demon.hp > 0) {
        this.demon.demonHealing();
        this.demon.hpBar.value = `${this.demon.hp}`;
      }
    }
  }

  winMessage() {
    this.winScore.innerHTML = `Win: ${this.score + 1}`;
    this.message.textContent = "You won...!!!";
  }

  lostMessage() {
    this.lostScore.innerHTML = `Loss: ${this.score + 1}`;
    this.message.textContent = "You lost...!!!";
  }

  stopGame() {
    if (this.hero.hp !== 0 && this.demon.hp !== 0) {
      this.demonStrike();
      this.demon.randomMovement();
      this.demonHealth();
      this.demon.render();
    }
  }

  loop(timestamp) {
    if (this.previousTimestamp === undefined)
      this.previousTimestamp = timestamp;
    this.previousTimestamp = timestamp;
    this.heroMovement();
    if (U.isCollision(this.hero, this.demon)) {
      this.stopGame();
      this.demon.hp === 0
        ? this.winMessage()
        : this.hero.hp === 0 && this.lostMessage();
    }
    window.requestAnimationFrame(() => this.loop());
  }
}
