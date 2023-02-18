import React, { useState } from 'react';
import PanoramaImage from '../components/PanoramaImage';
import { panos } from '../assets/constants'
import styles from "../styles/Tour.module.css";

function Tour() {
  const [seed, setSeed] = useState(1);
  const reset = () => {
    setSeed(Math.random());
  }

  return (
    <div className={styles.tour}>
      <PanoramaImage
        key={seed}
        src={panos["A Blok"]["L100"]["day"]}
      ></PanoramaImage>
    </div>
  )
}

export default Tour