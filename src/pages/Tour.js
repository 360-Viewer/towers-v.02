import React, { useEffect, useRef, useState } from 'react';
import PanoramaImage from '../components/PanoramaImage';
import { panos } from '../assets/constants'
import styles from "../styles/Tour.module.css";
import Menu from '../components/Menu';

function Tour() {
  const photoSphereRef = useRef(null);
  const [seed, setSeed] = useState(1);
  // if in local strorage, use that, else use default
  const [currentImage, setCurrentImage] = useState({
    block: localStorage.getItem("currentBlock") || Object.keys(panos)[0],
    level: localStorage.getItem("currentLevel") || Object.keys(panos[Object.keys(panos)[0]])[0],
    view: localStorage.getItem("currentView") || "day"
  });

  useEffect(() => {
    localStorage.setItem("currentBlock", currentImage.block);
    localStorage.setItem("currentLevel", currentImage.level);
    localStorage.setItem("currentView", currentImage.view);
  }, [currentImage]);

  const reset = () => {
    setSeed(Math.random());
  }

  useEffect(() => {
    reset();
  }, [currentImage]);

  return (
    <div className={styles.tour}>
      <Menu
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
        photoSphereRef={photoSphereRef}
      />
      <PanoramaImage
        key={seed}
        src={panos[currentImage.block][currentImage.level][currentImage.view]}
        prv={panos[currentImage.block][currentImage.level]["preview"][currentImage.view]}
        photoSphereRef={photoSphereRef}
      ></PanoramaImage>
    </div>
  )
}

export default Tour