import { Sprite } from "./sprite.js";

const imgSrc = "assets/big-demon-idle.gif";

class Enemy extends Sprite {
  class = "demon";
  aggro = {
    width: 100,
    height: 100,
  };

  keysDown = ["up", "right", "down", "left"];

  constructor(container) {
    super(imgSrc);
    this.createElement();
    container.appendChild(this.element);
  }

  demonAttack(heroHp) {
    heroHp >= 1 ? (heroHp -= 1) : (heroHp = 0);
    return heroHp;
  }

  demonHealing() {
    this.hp <= 99 ? (this.hp += 1) : this.hp > 99 && (this.hp = 100);
  }

  randomMovement() {
    let randomMotion =
      this.keysDown[Math.floor(Math.random() * this.keysDown.length)];
    switch (randomMotion) {
      case "up":
        this.moveTop();
        break;
      case "right":
        this.moveRight();
        break;
      case "down":
        this.moveDown();
        break;
      case "left":
        this.moveLeft();
        this.element.style.transform = "scaleX(-1)";
        break;
    }
  }
}

export default Enemy;
