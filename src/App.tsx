import React, { useEffect, useRef } from 'react';
import './App.css';
import image1 from './images/donut.png';
import image2 from './images/pizza.png';
import image3 from './images/banana.png';
import SpotlightAnimator from './Spotlight';
import {loadImages} from './utils/images';

interface Props {
  images?: string[];
}

const Spotlight: React.FC<Props> = ({images}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const spotlightAnimator = new SpotlightAnimator({canvas: canvasRef.current});
      loadImages(images).then(imgs => {
        spotlightAnimator.addItem({
          canvas: spotlightAnimator.canvas,
          image: imgs[0],
          itemWidth: 20,
          wrapX0: 10,
          wrapY0: 10,
          wrapWidth: 30,
          wrapHeight: 30,
        });
        spotlightAnimator.addItem({
          canvas: spotlightAnimator.canvas,
          image: imgs[1],
          itemWidth: 35,
          wrapX0: 45,
          wrapY0: 5,
          wrapWidth: 40,
          wrapHeight: 60,
        });
        spotlightAnimator.addItem({
          canvas: spotlightAnimator.canvas,
          image: imgs[0],
          itemWidth: 5,
          wrapX0: 90,
          wrapY0: 20,
          wrapWidth: 10,
          wrapHeight: 30,
        });
        spotlightAnimator.addItem({
          canvas: spotlightAnimator.canvas,
          image: imgs[2],
          itemWidth: 35,
          wrapX0: 0,
          wrapY0: 65,
          wrapWidth: 50,
          wrapHeight: 35,
        });
        spotlightAnimator.start();
      });
      return () => spotlightAnimator.destroy();
    }
  }, [images]);
  return <canvas ref={canvasRef} />;
};

function App() {
  return <Spotlight images={[image1, image2, image3]} />
}

export default App;
