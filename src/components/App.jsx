import React, {useState, useEffect} from "react";
import Building from "./Building";
function App() {

    const [backendData, setBackendData] = useState([{}]);

    useEffect(() => {
        fetch("http://localhost:6060/")
            .then((res) => res.json())
            .then((data) => setBackendData(data));
    }, []);

    return (
        <>
            {(typeof backendData.message === "undefined") ? (<Building />) : (<h1>{backendData.message}</h1>)}
        </>
    );
}

export default App;

// https://luminary-backend.onrender.com/
// http://localhost:6060/