import React, { useEffect, useState } from 'react';
import { panos } from '../assets/constants';
import styles from "./Menu.module.css";
import moon from "../assets/icons/moon.svg";
import sun from "../assets/icons/sun.svg";
import right from "../assets/icons/right.svg";
import right_active from "../assets/icons/right-active.svg";
import { useNavigate } from 'react-router-dom'

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
        <button className={`${styles.verticalContainerItem} ${isActive ? styles.verticalContainerItemActive : ""}`}
            onClick={handleClick}>
            <p className={`${styles.text} ${isActive ? styles.textActive : ""}`}>
                {level}
            </p>
        </button>
    );
};

const NavigationItem = ({ block, level }) => {
    const navigate = useNavigate();

    function navigatePano() {
        localStorage.removeItem('yaw');
        localStorage.removeItem('pitch');
        localStorage.removeItem('zoom');
        navigate(`/${block}/${level}`);
    }

    return (
        <div className={styles.navigationItem} onClick={navigatePano}>
            <p className={styles.text}>
                {level}
            </p>
        </div>
    );
};


const BlockItem = ({ block, currentImage, setCurrentImage }) => {
    const [isActive, setIsActive] = useState(false);
    const [showLevelList, setShowLevelList] = useState(false);
    const levelListRef = React.useRef(null);

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

    // close level list when clicked outside
    useOutside(levelListRef, setShowLevelList);

    // close level list if escape key is pressed
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                setShowLevelList(false);
            }
        };
        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, []);

    return (
        <div>
            <div className={`${styles.verticalContainerItem} ${isActive ? styles.verticalContainerItemActive : ""}`}>
                <button className={styles.verticalContainerItem} style={{ backgroundColor: "transparent" }}
                    onClick={handleClick}>
                    <p className={`${styles.text} ${isActive ? styles.textActive : ""}`}>
                        {block}
                    </p>
                </button>
                {/* <div className={styles.rightWrapper}>
                    <img src={isActive ? right_active : right} className={styles.icon} onClick={() => setShowLevelList(!showLevelList)} />
                </div> */}
            </div >
            {/* list of levels */}
            {/* {showLevelList &&
                <div className={styles.navigationList} ref={levelListRef}>
                    <div className={styles.navigationHeader}>
                        <p className={styles.text}>
                            {`${block} Blok`}
                        </p>
                    </div>
                    {Object.keys(panos[block]).map((level) => {
                        return (
                            <NavigationItem
                                key={level}
                                block={block}
                                level={level}
                            />
                        );
                    })}
                </div>} */}
        </div>
    );
};
function Menu({ currentImage, setCurrentImage, photoSphereRef }) {
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
                <button className={styles.viewButton} onClick={handleViewClick}>
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
