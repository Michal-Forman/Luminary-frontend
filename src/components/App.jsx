import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../store/store';
import {frontendBaseName} from "./Config";
import Home from "../pages/Home";
import Starter from "../pages/Starter";
import Login from "../pages/Login";
import Journal from "../pages/Journal";
import Profile from "../pages/Profile";
import HabitTracker from "../pages/HabitTracker";
import WorkoutTracker from "../pages/WorkoutTracker";

function App() {
    console.log(frontendBaseName);
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
                        <Route exact path="/habit-tracker" element={<HabitTracker/>} />
                        <Route exact path="/workout-tracker" element={<WorkoutTracker/>} />
                    </Routes>
                </Router>
            </Provider>
        </>
    );
}

export default App;

// "homepage": "https://michal-forman.github.io/Luminary-frontend/",