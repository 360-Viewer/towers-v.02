import React, { useEffect, useState } from 'react';
import PanoramaImage from '../components/PanoramaImage';
import { panos } from '../assets/constants'
import styles from "../styles/Tour.module.css";

function Tour() {
  const [seed, setSeed] = useState(1);
  const [currentBlock, setCurrentBlock] = useState("A Blok");
  const [currentLevel, setCurrentLevel] = useState("L100");
  const [currentView, setCurrentView] = useState("day");

  const reset = () => {
    setSeed(Math.random());
  }

  return (
    <div className={styles.tour}>
      <PanoramaImage
        key={seed}
        src={panos[currentBlock][currentLevel][currentView]}
        prv={panos[currentBlock][currentLevel]["preview"][currentView]}
      ></PanoramaImage>
    </div>
  )
}

export default Tour