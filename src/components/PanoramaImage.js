import React, { useRef, useState } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import Controls from "./Controls";
import styles from "./PanoramaImage.module.css"

const PSVImage = ({ src, setIsLoaded }) => {
  const photoSphereRef = useRef(null);

  return (
    <>
      <ReactPhotoSphereViewer
        containerClass={styles.panorama}
        ref={photoSphereRef}
        loadingImg={null}
        loadingTxt={null}
        width={"100%"}
        height={'100vh'}
        // sphereCorrection={{pan: 0, tilt: 0, roll: 0}}
        src={src}
        defaultZoomLvl={10}
        navbar={false}
        onReady={() => {
          // after 1.5 seconds, the image is considered loaded for animation purposes
          // setTimeout(() => {
          //   setIsLoaded(true);
          // }, 1500);
          setIsLoaded(true);
        }}
      ></ReactPhotoSphereViewer>
      <Controls photoSphereRef={photoSphereRef} />
    </>
  );
};


function PanoramaImage({ src, blr }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [show, setShow] = useState(true);

  return (
    <>
      {/* {!isLoaded &&
        <div className={styles.blurred}>
          <img src={blr}
            alt="loading"
            onLoad={() => setShow(true)}
          />
        </div>} */}
      {show && <PSVImage src={src} setIsLoaded={setIsLoaded} />}
      {/* {!isLoaded && <Controls />} */}
    </>
  )
}


export default PanoramaImage;
