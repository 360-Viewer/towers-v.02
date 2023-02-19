import React, { useRef, useState } from 'react'
import { redirect, useNavigate, useParams } from 'react-router-dom'
import { panos } from '../assets/constants';
import PanoramaImage from '../components/PanoramaImage';
import moon from "../assets/icons/moon.svg";
import sun from "../assets/icons/sun.svg";
import styles from "../components/Menu.module.css";
import Redirect404 from './Redirect404';


function TourDetailed() {
    const navigate = useNavigate();
    const { block, level } = useParams();
    const photoSphereRef = useRef(null);
    const [seed, setSeed] = useState(1);
    const [view, setView] = useState("day");

    const reset = () => {
        setSeed(Math.random());
    }

    const handleViewClick = () => {
        setView(view === "day" ? "night" : "day");
        localStorage.setItem('yaw', photoSphereRef.current.getPosition().yaw);
        localStorage.setItem('pitch', photoSphereRef.current.getPosition().pitch);
        localStorage.setItem('zoom', photoSphereRef.current.getZoomLevel());
        reset();
    }

    return (
        <>
            <div style={{ position: "absolute", top: "12px", left: "12px", zIndex: 100 }}>
                <button className={styles.viewButton} onClick={handleViewClick}>
                    <img
                        src={view === "day" ? moon : sun}
                        alt="view"
                        className={styles.icon} />
                </button>
            </div>
            {(panos[block] && panos[block][level]) ? (
                <PanoramaImage
                    key={seed}
                    src={panos[block][level][view]}
                    prv={panos[block][level]["preview"][view]}
                    photoSphereRef={photoSphereRef}
                    homeExist={true}
                ></PanoramaImage>)
                :
                (
                    <Redirect404 />
                )
            }
        </>
    )
}

export default TourDetailed