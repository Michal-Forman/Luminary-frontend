import React, {useState, useEffect} from "react";

function App() {

    const [backendData, setBackendData] = useState([{}]);

    useEffect(() => {
        fetch("https://luminary-backend.onrender.com/")
            .then((res) => res.json())
            .then((data) => setBackendData(data));
    }, []);

    return (
        <>
            {(typeof backendData.message === "undefined") ? (<h1>Loading ...</h1>) : (<h1>{backendData.message}</h1>)}
        </>
    );
}

export default App;