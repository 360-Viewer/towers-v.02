import React, { useState, useEffect } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import Controls from "./Controls";
import styles from "./PanoramaImage.module.css"

const PSVImage = ({ src, setIsPSVLoaded, isPSVLoaded, photoSphereRef, homeExist }) => {

  useEffect(() => {
    if (!photoSphereRef.current)
      return;
    if (localStorage.getItem('yaw') === null || localStorage.getItem('pitch') === null || localStorage.getItem('zoom') === null) {
      return;
    }
    setTimeout(() => {
      photoSphereRef.current.animate({
        yaw: localStorage.getItem('yaw'),
        pitch: localStorage.getItem('pitch'),
        zoom: localStorage.getItem('zoom'),
        speed: '5rpm'
      });
    }, 3500);
  }, [photoSphereRef]);

  return (
    <>
      {<ReactPhotoSphereViewer
        containerClass={styles.panorama}
        ref={photoSphereRef}
        loadingImg={null}
        // defaultYaw={localStorage.getItem('yaw') || 0}
        // defaultPitch={localStorage.getItem('pitch') || 0}
        // defaultZoom={localStorage.getItem('zoom') || 0}
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
          }, 2000);
        }}
      ></ReactPhotoSphereViewer>}
      {isPSVLoaded && <Controls photoSphereRef={photoSphereRef} homeExist={homeExist} />}
    </>
  );
};


function PanoramaImage({ src, prv, photoSphereRef, homeExist }) {
  const [isPSVLoaded, setIsPSVLoaded] = useState(false);
  const [showPSVImage, setShowPSVImage] = useState(false);

  return (
    <>
      {!isPSVLoaded &&
        <>
          <div className={styles.blurred} useRef={prv}>
            <img src={prv}
              onLoad={() => setShowPSVImage(true)}
            />
          </div>
        </>
      }
      {showPSVImage && <PSVImage
        src={src}
        setIsPSVLoaded={setIsPSVLoaded}
        isPSVLoaded={isPSVLoaded}
        photoSphereRef={photoSphereRef}
        homeExist={homeExist}
      />}
      {!isPSVLoaded && <Controls photoSphereRef={null} homeExist={homeExist} />}
    </>
  )
}


export default PanoramaImage;
