const FPS = 60
const periodMs = 1 / FPS
const spotlightPower = 1
const animationSpeed = 500
const spotlightRange = 0.2
const spotlightRotationSpeed = 2

// TODO: Удалить эту функцию и все её вызовы перед продакшеном
const plotBorder = (
  canvas: HTMLCanvasElement,
  color: string,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): void => {
  const context = canvas.getContext('2d')
  if (!context) {
    return
  }
  context.beginPath()
  context.strokeStyle = color
  context.moveTo(Math.min(x0, x1), Math.min(y0, y1))
  context.lineTo(Math.max(x0, x1), Math.min(y0, y1))
  context.lineTo(Math.max(x0, x1), Math.max(y0, y1))
  context.lineTo(Math.min(x0, x1), Math.max(y0, y1))
  context.lineTo(Math.min(x0, x1), Math.min(y0, y1))
  context.stroke()
}

interface SpotlightItemProps {
  image: HTMLImageElement
  itemWidth: number
  wrapX0: number
  wrapY0: number
  wrapWidth: number
  wrapHeight: number
  canvas: HTMLCanvasElement
  color: string
}

interface SpotlightItemConfig {
  image: HTMLImageElement
  itemWidth: number
  wrapX0: number
  wrapY0: number
  wrapWidth: number
  wrapHeight: number
}

interface SpotlightAnimatorProps {
  canvas: HTMLCanvasElement
  color: string
}

class SpotlightItem {
  private readonly color: string
  private readonly canvas: HTMLCanvasElement
  private readonly image: HTMLImageElement
  private readonly itemWidth: number
  private readonly wrapX0: number
  private readonly wrapY0: number
  private readonly wrapWidth: number
  private readonly wrapHeight: number
  private readonly context: CanvasRenderingContext2D | null
  private t: number
  private x: number
  private y: number
  private widthPx: number
  private heightPx: number
  private wrapWidthPx: number
  private wrapHeightPx: number
  private wrapX0Px: number
  private wrapY0Px: number

  constructor(props: SpotlightItemProps) {
    this.color = props.color
    this.image = props.image
    this.itemWidth = props.itemWidth
    this.wrapX0 = props.wrapX0
    this.wrapY0 = props.wrapY0
    this.wrapWidth = props.wrapWidth
    this.wrapHeight = props.wrapHeight
    this.canvas = props.canvas
    this.context = props.canvas.getContext('2d')
    this.t = 0
    this.widthPx = 0
    this.heightPx = 0
    this.wrapHeightPx = 0
    this.wrapWidthPx = 0
    this.wrapX0Px = 0
    this.wrapY0Px = 0
    this.calculatePx()
    this.x = this.getX(this.t)
    this.y = this.getY(this.t)
  }

  private calculatePx() {
    this.wrapX0Px = (this.canvas.width * this.wrapX0) / 100
    this.wrapY0Px = (this.canvas.height * this.wrapY0) / 100
    this.wrapHeightPx = (this.wrapHeight / 100) * this.canvas.height
    this.wrapWidthPx = (this.wrapWidth / 100) * this.canvas.width
    this.widthPx = (this.itemWidth / 100) * this.canvas.width
    this.heightPx =
      (((this.itemWidth / this.image.width) * this.image.height) / 100) *
      this.canvas.width
    if (this.heightPx > this.wrapHeightPx) {
      this.heightPx = this.wrapHeightPx
      this.widthPx = (this.wrapHeightPx * this.image.width) / this.image.height
    }
  }

  private getX(t: number) {
    return (
      ((this.wrapWidthPx - this.widthPx) / 2) * (Math.cos(t) + 1) +
      this.wrapX0Px
    )
  }

  private getY(t: number) {
    return (
      ((this.wrapHeightPx - this.heightPx) / 2) * (Math.sin(t) + 1) +
      this.wrapY0Px
    )
  }

  private incrementTime() {
    this.t += (animationSpeed * periodMs) / 1000
  }

  private move() {
    this.incrementTime()
    this.calculatePx()
    this.x = this.getX(this.t)
    this.y = this.getY(this.t)
  }

  private getGradient(): CanvasGradient | string {
    if (!this.context) {
      return this.color
    }
    const centerX = this.x + this.widthPx / 2
    const centerY = this.y + this.heightPx / 2
    const gradientRadius = Math.min(this.widthPx, this.heightPx) / 2
    const gradient = this.context.createRadialGradient(
      centerX +
        gradientRadius *
          spotlightRange *
          Math.cos(this.t * spotlightRotationSpeed),
      centerY +
        gradientRadius *
          spotlightRange *
          Math.sin(this.t * spotlightRotationSpeed),
      gradientRadius,
      centerX +
        gradientRadius *
          spotlightRange *
          Math.cos(this.t * spotlightRotationSpeed),
      centerY +
        gradientRadius *
          spotlightRange *
          Math.sin(this.t * spotlightRotationSpeed),
      0,
    )
    gradient.addColorStop(0, this.color)
    gradient.addColorStop(1 - spotlightPower, this.color)
    gradient.addColorStop(1, 'transparent')
    return gradient
  }

  private renderSpotlight() {
    if (!this.context) {
      return
    }
    this.context.fillStyle = this.getGradient()
    this.context.fillRect(
      this.x - 1,
      this.y - 1,
      Math.ceil(this.widthPx) + 1,
      Math.ceil(this.heightPx) + 1,
    )
  }

  public render() {
    if (!this.context) {
      return
    }
    this.context.save()
    this.context.drawImage(
      this.image,
      this.x,
      this.y,
      this.widthPx,
      this.heightPx,
    )
    this.renderSpotlight()
    this.context.restore()
    /*
    plotBorder(this.canvas, 'red', this.x, this.y, this.x + this.widthPx, this.y + this.heightPx);
    plotBorder(
      this.canvas,
      'red',
      this.wrapX0Px,
      this.wrapY0Px,
      this.wrapX0Px + this.wrapWidthPx,
      this.wrapY0Px + this.wrapHeightPx,
    );
    */
    this.move()
  }
}

export default class SpotlightAnimator {
  private readonly canvas: HTMLCanvasElement
  private readonly color: string
  private readonly items: SpotlightItem[]
  private readonly context: CanvasRenderingContext2D | null
  private requestAnimation: number

  constructor(props: SpotlightAnimatorProps) {
    this.canvas = props.canvas
    this.color = props.color
    this.items = []
    this.context = props.canvas.getContext('2d')
    this.requestAnimation = 0
    this.setCanvasSize()
    window.addEventListener('resize', () => this.setCanvasSize())
  }
  public addItem(config: SpotlightItemConfig) {
    this.items.push(
      new SpotlightItem({
        canvas: this.canvas,
        image: config.image,
        itemWidth: config.itemWidth,
        wrapX0: config.wrapX0,
        wrapY0: config.wrapY0,
        wrapWidth: config.wrapWidth,
        wrapHeight: config.wrapHeight,
        color: this.color,
      }),
    )
  }

  private setCanvasSize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  private render = (timestamp: number): void => {
    if (!this.context) {
      return
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.items.forEach((item) => item.render())
    this.requestAnimation = requestAnimationFrame(this.render)
  }

  public start() {
    this.requestAnimation = requestAnimationFrame(this.render)
  }

  public destroy() {
    cancelAnimationFrame(this.requestAnimation)
  }
}
