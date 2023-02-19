import React, { useRef, useState, useEffect } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import Controls from "./Controls";
import styles from "./PanoramaImage.module.css"


const PSVImage = ({ src, setIsPSVLoaded, isPSVLoaded }) => {
  const photoSphereRef = useRef(null);

  return (
    <>
      {<ReactPhotoSphereViewer
        containerClass={styles.panorama}
        ref={photoSphereRef}
        loadingImg={null}
        loadingTxt={null}
        width={"100%"}
        height={'100vh'}
        src={src}
        defaultZoomLvl={10}
        navbar={false}
        onReady={() => {
          // render delay to prevent flickering
          setTimeout(() => {
            setIsPSVLoaded(true);
          }, 1500);
        }}
      ></ReactPhotoSphereViewer>}
      {isPSVLoaded && <Controls photoSphereRef={photoSphereRef} />}
    </>
  );
};


function PanoramaImage({ src, prv }) {
  const [isPSVLoaded, setIsPSVLoaded] = useState(false);
  const [showPSVImage, setShowPSVImage] = useState(false);

  return (
    <>
      {!isPSVLoaded &&
        <div className={styles.blurred} useRef={prv}>
          <img src={prv}
            alt="loading"
            onLoad={() => setShowPSVImage(true)}
          />
        </div>}
      {showPSVImage && <PSVImage src={src} setIsPSVLoaded={setIsPSVLoaded} isPSVLoaded={isPSVLoaded} />}
    </>
  )
}


export default PanoramaImage;
