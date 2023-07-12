import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../store/store';
import Home from "../pages/Home";
import Starter from "../pages/Starter";
import Login from "../pages/Login";


function App() {
    return (
        <>
            <Provider store={store}>
                <Router basename="/Luminary-frontend">
                    <Routes>
                        <Route exact path="/" element={<Starter/>}/>
                        <Route exact path="/home" element={<Home/>}/>
                        <Route exact path="login" element={<Login/>}/>
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