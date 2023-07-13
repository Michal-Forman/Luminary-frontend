import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function Journal() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    const navigate = useNavigate();
    const date = new Date();
    const today = date.getDate() + ". " + (date.getMonth() + 1) + ". " + date.getFullYear();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, []);

    return (
        <>
            <div className="journalNavBar">
                <Link to="/home"><img className="icon navBarIcon" src={require("../IMG/homeIcon.png")} alt="home icon"/>
                </Link>
                <Link to="/profile"><img className="icon navBarIcon" src={require("../IMG/profileIcon.png")}
                                         alt="profile icon"/> </Link>
            </div>
            <h1 className="journalTitle registerTitle">Journal</h1>
            <div className="writeButton"><img className="writeButtonImage" src={require("../IMG/writeButton1.png")}/></div>
        </>
    );
}

export default Journal;