import React from "react";
import { useNavigate } from 'react-router-dom'
import styles from "./Controls.module.css";
import zoom_in from "../assets/icons/zoom-in.svg";
import zoom_out from "../assets/icons/zoom-out.svg";
import left from "../assets/icons/left.svg";
import right from "../assets/icons/right.svg";
import fullscreen from "../assets/icons/fullscreen.svg";
import autorotate from "../assets/icons/autorotate.svg";
import home from "../assets/icons/home.svg";


function Controls({ photoSphereRef, homeExist }) {
    const navigate = useNavigate();

    const handleLeftClick = () => {
        photoSphereRef.current.animate({
            yaw: photoSphereRef.current.getPosition().yaw - 0.5,
            pitch: photoSphereRef.current.getPosition().pitch,
            speed: '3rpm',
        });
    }

    const handleRightClick = () => {
        photoSphereRef.current.animate({
            yaw: photoSphereRef.current.getPosition().yaw + 0.5,
            pitch: photoSphereRef.current.getPosition().pitch,
            speed: '3rpm',
        });
    }

    const handleZoomIn = () => {
        photoSphereRef.current.animate({
            zoom: photoSphereRef.current.getZoomLevel() + 20,
            speed: '3rpm',
        });
    }

    const handleZoomOut = () => {
        photoSphereRef.current.animate({
            zoom: photoSphereRef.current.getZoomLevel() - 20,
            speed: '3rpm',
        });
    }

    const handleHomeClick = () => {
        // clear local storage
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className={styles.controls}>
            <div className={styles.buttons}>
                {homeExist && <button onClick={handleHomeClick}>
                    <img src={home} />
                </button>}
                <button onClick={handleLeftClick}>
                    <img src={left} />
                </button>
                <button onClick={handleRightClick}>
                    <img src={right} />
                </button>
                <button onClick={() => photoSphereRef.current.toggleAutorotate()}>
                    <img src={autorotate} />
                </button>
                <button onClick={handleZoomIn}>
                    <img src={zoom_in} />
                </button>
                <button onClick={handleZoomOut}>
                    <img src={zoom_out} />
                </button>
                <button onClick={() => { photoSphereRef.current.toggleFullscreen(); }}>
                    <img src={fullscreen} />
                </button>
            </div>
        </div>
    )
}

export default Controls;