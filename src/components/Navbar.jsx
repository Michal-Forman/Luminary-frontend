import React from "react";
import {NavLink} from "react-router-dom";

function Navbar() {
    return (
        <>
            <div className="navbar">
                <NavLink to="/home">
                    <img className="icon navBarIcon" src={require("../IMG/homeIcon.png")} alt="home icon"/>
                </NavLink>
                <NavLink to="/journal">
                    <img className="icon navBarIcon" src={require("../IMG/journalIcon.png")} alt="journal icon"/>
                </NavLink>
                <NavLink to="/profile">
                    <img className="icon navBarIcon" src={require("../IMG/profileIcon.png")} alt="profile icon"/>
                </NavLink>
            </div>
        </>
    );
}

export default Navbar;