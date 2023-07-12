import React, { useState, useEffect } from "react";
import Building from "../components/Building";
import Register from "../components/Register";


function Starter() {
    const [backendData, setBackendData] = useState([{}]);

    useEffect(() => {
        fetch("https://luminary-backend.onrender.com/")
            .then((res) => res.json())
            .then((data) => setBackendData(data));
    }, []);

    return (
        <>
            {typeof backendData.message === "undefined" ? (
                <Building />
            ) : (
                <Register />
            )}
        </>
    );
}

export default Starter;
