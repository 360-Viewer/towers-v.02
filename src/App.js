import React, { createContext } from 'react';
import { Route, Routes } from "react-router-dom";
import Tour from "./pages/Tour";
import Costum404 from "./pages/Costum404";
import TourDetailed from './pages/TourDetailed';
import styles from "./styles/App.module.css";

export const AppContext = createContext();

function App() {

  // prevent right click
  // useEffect(() => {
  //   document.addEventListener("contextmenu", (e) => e.preventDefault());
  // }, []);

  return (
    <div onDragStart={(e) => e.preventDefault()} className={styles.app}>
      <Routes>
        <Route path={"/"} element={<Tour />} />
        <Route path={`/:block/:floor/:view`} element={<TourDetailed />} />
        <Route path={"/404"} element={<Costum404 />} />
      </Routes>
    </div>
  );
}

export default App;
