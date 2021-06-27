const FPS = 60;
const period_ms = 1 / FPS;
const spotlightPower = 1;
const animationSpeed = 500;
const spotlightRange = 0.2;
const spotlightRotationSpeed = 2;

interface SpotlightItemProps {
  image: HTMLImageElement;
  itemWidth: number;
  wrapX0: number;
  wrapY0: number;
  wrapWidth: number;
  wrapHeight: number;
  canvas: HTMLCanvasElement;
}

interface SpotlightAnimatorProps {
  canvas: HTMLCanvasElement;
}

class SpotlightItem {
  private readonly canvas: HTMLCanvasElement;
  private readonly image: HTMLImageElement;
  private readonly itemWidth: number;
  private readonly wrapX0: number;
  private readonly wrapY0: number;
  private readonly wrapWidth: number;
  private readonly wrapHeight: number;
  private readonly context: CanvasRenderingContext2D | null;
  private t: number;
  private x: number;
  private y: number;
  private width_px: number;
  private height_px: number;
  private wrapWidth_px: number;
  private wrapHeight_px: number;
  private wrapX0_px: number;
  private wrapY0_px: number;

  constructor(props: SpotlightItemProps) {
    this.image = props.image;
    this.itemWidth = props.itemWidth;
    this.wrapX0 = props.wrapX0;
    this.wrapY0 = props.wrapY0;
    this.wrapWidth = props.wrapWidth;
    this.wrapHeight = props.wrapHeight;
    this.canvas = props.canvas;
    this.context = props.canvas.getContext('2d');
    this.t = 0;
    this.width_px = 0;
    this.height_px = 0;
    this.wrapHeight_px = 0;
    this.wrapWidth_px = 0;
    this.wrapX0_px = 0;
    this.wrapY0_px = 0;
    this.calculatePx();
    this.x = this.getX(this.t);
    this.y = this.getY(this.t);
  }

  private calculatePx() {
    this.wrapX0_px = (this.canvas.width * this.wrapX0) / 100;
    this.wrapY0_px = (this.canvas.height * this.wrapY0) / 100;
    this.wrapHeight_px = (this.wrapHeight / 100) * this.canvas.height;
    this.wrapWidth_px = (this.wrapWidth / 100) * this.canvas.width;
    this.width_px = (this.itemWidth / 100) * this.canvas.width;
    this.height_px = (((this.itemWidth / this.image.width) * this.image.height) / 100) * this.canvas.width;
    if (this.height_px > this.wrapHeight_px) {
      this.height_px = this.wrapHeight_px;
      this.width_px = (this.wrapHeight_px * this.image.width) / this.image.height;
    }
  }

  private getX(t: number) {
    return ((this.wrapWidth_px - this.width_px) / 2) * (Math.cos(t) + 1) + this.wrapX0_px;
  }

  private getY(t: number) {
    return ((this.wrapHeight_px - this.height_px) / 2) * (Math.sin(t) + 1) + this.wrapY0_px;
  }

  private incrementTime() {
    this.t += (animationSpeed * period_ms) / 1000;
  }

  private move() {
    this.incrementTime();
    this.calculatePx();
    this.x = this.getX(this.t);
    this.y = this.getY(this.t);
  }

  private renderSpotlight() {
    if (!this.context) {
      return;
    }
    const center_x = this.x + this.width_px / 2;
    const center_y = this.y + this.height_px / 2;
    const R = Math.min(this.width_px, this.height_px) / 2;
    const gradient = this.context.createRadialGradient(
      center_x + R * spotlightRange * Math.cos(this.t * spotlightRotationSpeed),
      center_y + R * spotlightRange * Math.sin(this.t * spotlightRotationSpeed),
      R,
      center_x + R * spotlightRange * Math.cos(this.t * spotlightRotationSpeed),
      center_y + R * spotlightRange * Math.sin(this.t * spotlightRotationSpeed),
      0,
    );
    gradient.addColorStop(0, '#111111');
    gradient.addColorStop(1 - spotlightPower, '#111111');
    gradient.addColorStop(1, 'transparent');
    this.context.fillStyle = gradient;
    this.context.fillRect(this.x - 1, this.y - 1, Math.ceil(this.width_px) + 1, Math.ceil(this.height_px) + 1);
  }

  public render() {
    if (!this.context) {
      return;
    }
    this.context.save();
    this.context.drawImage(this.image, this.x, this.y, this.width_px, this.height_px);
    this.renderSpotlight();
    this.context.restore();
    this.move();
  }
}

export default class SpotlightAnimator {
  public readonly canvas: HTMLCanvasElement;
  private readonly items: SpotlightItem[];
  private readonly context: CanvasRenderingContext2D | null;
  private requestAnimation: number;

  constructor(props: SpotlightAnimatorProps) {
    this.canvas = props.canvas;
    this.items = [];
    this.context = props.canvas.getContext('2d');
    this.requestAnimation = 0;
    this.setCanvasSize();
    window.addEventListener('resize', () => this.setCanvasSize());
  }
  public addItem(props: SpotlightItemProps) {
    this.items.push(new SpotlightItem(props));
  }

  public start() {
    this.requestAnimation = requestAnimationFrame(this.render);
  }

  private render = (timestamp: number): void => {
    if (!this.context) {
      return;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.items.forEach((item) => item.render());
    this.requestAnimation = requestAnimationFrame(this.render);
  };

  public destroy() {
    cancelAnimationFrame(this.requestAnimation);
  }

  private setCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}
