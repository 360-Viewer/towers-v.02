import React from 'react'
import { Link } from 'react-router-dom'

function Costum404() {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#222',
            position: 'absolute',
            top: 0,
            left: 0,
        },
        h1: {
            fontFamily: 'sans-serif',
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#fff',
        },
        link: {
            fontFamily: 'sans-serif',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'rgb(100, 100, 100)',
            textDecoration: 'none',
            marginTop: '1rem',
        },
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.h1}>Sayfa Bulunamadı</h1>
            <Link style={styles.link} to="/">Anasayfaya Dön</Link>
        </div>
    )
}

export default Costum404