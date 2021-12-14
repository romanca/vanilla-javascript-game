export const PLAYGROUND_WIDTH = 400;
export class Sprite {
  element;
  imgSrc;
  dimensions = {
    width: 0,
    height: 0,
  };
  position = {
    top: 0,
    left: 0,
  };
  step = 1;
  hp = 100;
  hpBar;

  constructor(imgSrc) {
    this.imgSrc = imgSrc;
  }

  createElement() {
    const elemContainer = document.createElement("div");
    elemContainer.setAttribute("class", this.class);
    const elemHealth = document.createElement("progress");
    elemHealth.id = this.class;
    elemHealth.setAttribute("max", "100");
    elemHealth.setAttribute("value", `${this.hp}`);
    const elem = document.createElement("img");
    elem.addEventListener("load", () => {
      this.dimensions.height = elem.offsetHeight;
      this.dimensions.width = elem.offsetWidth;
      this.spawn();
      this.render();
    });
    elem.setAttribute("src", this.imgSrc);
    elemContainer.appendChild(elemHealth);
    elemContainer.appendChild(elem);

    this.element = elemContainer;
    this.hpBar = elemHealth;
  }

  spawn() {
    this.position.left =
      Math.random() * (PLAYGROUND_WIDTH - this.dimensions.width);
    this.position.top =
      Math.random() * (PLAYGROUND_WIDTH - this.dimensions.height);
  }

  render() {
    this.element.style.left = `${this.position.left}px`;
    this.element.style.top = `${this.position.top}px`;
  }

  moveRight() {
    this.position.left < PLAYGROUND_WIDTH - this.dimensions.width - this.step
      ? (this.position.left += this.step)
      : (this.position.left = PLAYGROUND_WIDTH - this.dimensions.width);
  }

  moveLeft() {
    this.position.left > this.step
      ? (this.position.left -= this.step)
      : (this.position.left = 0);
  }

  moveTop() {
    this.position.top > this.step
      ? (this.position.top -= this.step)
      : (this.position.top = 0);
  }

  moveDown() {
    this.position.top < PLAYGROUND_WIDTH - this.dimensions.height - this.step
      ? (this.position.top += this.step)
      : (this.position.top = PLAYGROUND_WIDTH - this.dimensions.height);
  }
}
