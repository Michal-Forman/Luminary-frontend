import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../store/store';
import Home from "../pages/Home";
import Starter from "../pages/Starter";
import Login from "../pages/Login";
import Journal from "../pages/Journal";
import Profile from "../pages/Profile";
import {frontendBaseName} from "./Config";

function App() {
    return (
        <>
            <Provider store={store}>
                <Router basename={frontendBaseName}>
                    <Routes>
                        <Route exact path="/" element={<Starter/>}/>
                        <Route exact path="/home" element={<Home/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/journal" element={<Journal/>}/>
                        <Route exact path="/profile" element={<Profile/>} />
                    </Routes>
                </Router>
            </Provider>
        </>
    );
}

export default App;

// https://luminary-backend.onrender.com/
// http://localhost:6060/
// "homepage": "https://michal-forman.github.io/Luminary-frontend/",