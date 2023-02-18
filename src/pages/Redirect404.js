import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Redirect404() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/404");
    }, [navigate])

    return (
        <>
            {/* only for redirecting */}
        </>
    )
}

export default Redirect404