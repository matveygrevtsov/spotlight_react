import React, { useEffect, useRef } from 'react'
import './App.css'
import image1 from './images/circle.svg';
import image2 from './images/rectangle.svg';
import image3 from './images/triangle.svg';
import image4 from './images/triangle2.svg';
import SpotlightAnimator from './Spotlight'
import { loadImages } from './utils/images'

interface Props {
  images?: string[]
}

const Spotlight: React.FC<Props> = ({ images }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvasRef.current) {
      const spotlightAnimator = new SpotlightAnimator({
        canvas: canvasRef.current,
        color: '#111111',
      })
      loadImages(images).then((imgs) => {
        spotlightAnimator.addItem({
          image: imgs[0],
          itemWidth: 9,
          wrapX0: 18,
          wrapY0: 4,
          wrapWidth: 9,
          wrapHeight: 30,
        })
        spotlightAnimator.addItem({
          image: imgs[1],
          itemWidth: 20,
          wrapX0: 27,
          wrapY0: 7,
          wrapWidth: 28,
          wrapHeight: 23,
        })
        spotlightAnimator.addItem({
          image: imgs[0],
          itemWidth: 20,
          wrapX0: 55,
          wrapY0: 3,
          wrapWidth: 28,
          wrapHeight: 30,
        })
        spotlightAnimator.addItem({
          image: imgs[2],
          itemWidth: 40,
          wrapX0: 30,
          wrapY0: 34,
          wrapWidth: 40,
          wrapHeight: 66,
        })
        spotlightAnimator.addItem({
          image: imgs[0],
          itemWidth: 5,
          wrapX0: 20,
          wrapY0: 70,
          wrapWidth: 10,
          wrapHeight: 20,
        })
        spotlightAnimator.addItem({
          image: imgs[3],
          itemWidth: 10,
          wrapX0: 70,
          wrapY0: 70,
          wrapWidth: 10,
          wrapHeight: 20,
        })
        spotlightAnimator.start()
      })
      return () => spotlightAnimator.destroy()
    }
  }, [images])
  return <canvas ref={canvasRef} />
}

function App() {
  return <Spotlight images={[image1, image2, image3, image4]} />
}

export default App
