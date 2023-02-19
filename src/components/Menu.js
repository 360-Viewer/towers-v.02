import React, { useEffect, useState } from 'react';
import { panos } from '../assets/constants';
import styles from "./Menu.module.css";
import moon from "../assets/icons/moon.svg";
import sun from "../assets/icons/sun.svg";
import right from "../assets/icons/right.svg";
import right_active from "../assets/icons/right-active.svg";
import loader from "../assets/icons/loader.svg";
import { useNavigate } from 'react-router-dom'

const Preload = ({ level, block, view, onLoad }) => {
    return (
        <>
            <div style={{ width: '100vw', height: '100vh', position: "absolute", top: 0, left: 0, zIndex: 100 }}>
                <img src={loader} style={{ position: "absolute", top: "50%", left: "50%" }} />
            </div>
            <img src={panos[block][level]["preview"][view]} style={{ display: "none" }} />
            <img src={panos[block][level][view]} style={{ display: "none" }} onLoad={onLoad} />
        </>
    )
}


export function useOutside(ref, setShow) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShow(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}


const LevelItem = ({ level, currentImage, setCurrentImage, photoSphereRef }) => {
    const [isActive, setIsActive] = useState(false);
    const [preload, setPreload] = useState(false);

    useEffect(() => {
        setIsActive(level === currentImage.level);
    }, [currentImage.level, level]);

    async function handleClick() {
        if (level === currentImage.level) {
            photoSphereRef.current.animate({
                yaw: 0,
                pitch: 0,
                zoom: 10,
                speed: '5rpm',
            });
            return;
        }
        // add pitch yaw and zoom to local storage
        localStorage.setItem('yaw', photoSphereRef.current.getPosition().yaw);
        localStorage.setItem('pitch', photoSphereRef.current.getPosition().pitch);
        localStorage.setItem('zoom', photoSphereRef.current.getZoomLevel());

        await setCurrentImage({ ...currentImage, level: level });
    }

    return (
        <div>
            {preload &&
                <Preload level={level}
                    block={currentImage.block}
                    view={currentImage.view}
                    onLoad={() => {
                        setPreload(false);
                        handleClick();
                    }} />
            }
            <button className={`${styles.verticalContainerItem} ${isActive ? styles.verticalContainerItemActive : ""}`}
                onClick={() => {
                    if (level === currentImage.level) {
                        handleClick();
                        return;
                    }
                    setPreload(true);
                }}>
                <p className={`${styles.text} ${isActive ? styles.textActive : ""}`}>
                    {level}
                </p>
            </button>
        </div>
    );
};

const BlockItem = ({ block, currentImage, setCurrentImage }) => {
    const [isActive, setIsActive] = useState(false);
    const levelListRef = React.useRef(null);
    const [preload, setPreload] = useState(false);

    useEffect(() => {
        setIsActive(block === currentImage.block);
    }, [currentImage.block, block]);


    async function handleClick() {
        if (block === currentImage.block) {
            return;
        }
        // delete pitch yaw and zoom from local storage
        localStorage.removeItem('yaw');
        localStorage.removeItem('pitch');
        localStorage.removeItem('zoom');

        await setCurrentImage({ ...currentImage, block: block, level: Object.keys(panos[block])[0] });
    }

    return (
        <div>
            {preload &&
                <Preload level={Object.keys(panos[block])[0]} block={block} view={currentImage.view} onLoad={() => { setPreload(false); handleClick() }} />
            }
            <div className={`${styles.verticalContainerItem} ${isActive ? styles.verticalContainerItemActive : ""}`}>
                <button className={styles.verticalContainerItem} style={{ backgroundColor: "transparent" }}
                    onClick={() => {
                        if (block === currentImage.block) {
                            return;
                        }
                        setPreload(true);
                    }}>
                    <p className={`${styles.text} ${isActive ? styles.textActive : ""}`}>
                        {block.replace(/-/g, ' ')}
                    </p>
                </button>
            </div >
        </div>
    );
};
function Menu({ currentImage, setCurrentImage, photoSphereRef }) {
    const [preload, setPreload] = useState(false);
    async function handleViewClick() {
        await setCurrentImage({ ...currentImage, view: currentImage.view === "day" ? "night" : "day" });
    }
    return (
        <>
            <div className={styles.verticalContainer} style={{ right: "12px", top: "12px" }}>
                {Object.keys(panos).map((block) => {
                    return (
                        <BlockItem
                            key={block}
                            block={block}
                            currentImage={currentImage}
                            setCurrentImage={setCurrentImage} />
                    );
                })}
            </div>
            <div className={styles.verticalContainer} style={{ left: "12px", top: "12px" }}>
                {preload &&
                    <Preload level={currentImage.level} block={currentImage.block} view={currentImage.view === "day" ? "night" : "day"} onLoad={() => { setPreload(false); handleViewClick() }} />
                }
                <button className={styles.viewButton} onClick={() => setPreload(true)}>
                    <img
                        src={currentImage.view === "day" ? moon : sun}
                        alt="view"
                        className={styles.icon} />
                </button>
                {Object.keys(panos[currentImage.block]).map((level) => {
                    return (
                        <LevelItem
                            key={level}
                            level={level}
                            currentImage={currentImage}
                            setCurrentImage={setCurrentImage}
                            photoSphereRef={photoSphereRef}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Menu;
