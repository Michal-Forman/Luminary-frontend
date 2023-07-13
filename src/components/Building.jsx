import React, { useState, useEffect } from 'react';
import SpinningFlower from './SpinningFlower';

function Building() {
    const [waitTime, setWaitTime] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setWaitTime(prevTime => prevTime - 1);
        }, 1000);

        if (waitTime === 0) {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [waitTime]);

    return (
        <div className="buildingPage">
            <h1 className="loadingText">Loading ...</h1>
            <h2 className="loadingText">{waitTime}</h2>
            <SpinningFlower />
        </div>
    );
}

export default Building;
