import React from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Home() {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    const navigate = useNavigate();

    if (!isAuthenticated) {
        console.log(isAuthenticated);
        navigate("/");
    } else if (isAuthenticated) {
        console.log(isAuthenticated);
        return (
            <div>
                <h1>Home</h1>
                <h2>{user.email}</h2>
            </div>
        );
    }

}

export default Home;