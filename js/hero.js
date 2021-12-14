import { Sprite } from "./sprite.js";

const imgSrc = "assets/wizzard.gif";

class Hero extends Sprite {
  class = "wizzard";
  keysDown = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    x: false,
    c: false,
  };

  constructor(container) {
    super(imgSrc);
    this.createElement();
    container.appendChild(this.element);

    window.addEventListener("keydown", (e) => {
      if (!e.key.startsWith("Arrow") && e.key !== "x" && e.key !== "c") return;
      this.keysDown[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keysDown[e.key] = false;
    });
  }

  heroAttack(demonHp) {
    demonHp >= 1 ? (demonHp -= 2) : (demonHp = 0);
    return demonHp;
  }

  heroHealing() {
    this.hp <= 95 ? (this.hp += 5) : this.hp > 95 && (this.hp = 100);
  }
}

export default Hero;
