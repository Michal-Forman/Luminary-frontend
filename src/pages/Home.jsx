import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import {Link, useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, []);

    return (
        <div>
            <h1>Home</h1>
            {user && (
                <>
                    <Navbar />
                    <h2>{user.email}</h2>
                    <h2>{user.firstName}</h2>
                    <h2>{user.lastName}</h2>
                    <h2>{user.password}</h2>
                    <h2>{user._id}</h2>
                    <Link to="/journal"><img className="icon" src={require("../IMG/journalIcon.png")} /> </Link>
                </>
            )}
        </div>
    );
}

export default Home;
