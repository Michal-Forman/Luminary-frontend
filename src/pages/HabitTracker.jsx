import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import JournalForm from "../components/journalForm";
import habitForm from "../components/HabitForm";
import HabitForm from "../components/HabitForm";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import backendUrl from "../components/Config";

function HabitTracker() {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    const [habits, setHabits] = useState([{}]);

    const navigate = useNavigate();

    const fetchHabits = () => {
        fetch(`${backendUrl}/habit/${user._id}`)
            .then((res) => res.json())
            .then((data) => setHabits(data))
            .catch((error) => {
                console.error(error);
                // Handle any fetch errors here
            });
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            fetchHabits();
        }
    }, []);

    const handleHabitFormSubmit = () => {
        setCreatingHabit(false);
        fetchHabits();
        console.log("fetchHabits() called successfully");
    }

    const [creatingHabit, setCreatingHabit] = useState(false);

    const handleHabitButtonClick = () => {
        setCreatingHabit(true);
    }

    const handleBackClick = () => {
        setCreatingHabit(false);
    }

    return (
        <>
            <Navbar/>
            <div className="titleContainer">
                <h1 className="title">Habit Tracker</h1>
            </div>
            {habits.map((habit, index) => (
                <div className="habitContainer" key={index}>
                    <h1>{habit.name}</h1>
                    <h2>{habit.dailyGoal}</h2>
                    <h2>{habit.streak}</h2>
                    <h2>{habit.user}</h2>
                    <h2>{habit._id}</h2>
                </div>
            ))}
            <div className="writeButton">
                <img onClick={handleHabitButtonClick} className="habitTrackerImage"
                     src={require("../IMG/addHabitButton.png")}/>
            </div>
            {creatingHabit ? (
                <>
                    <div className="modalOverlay"></div>
                    <HabitForm handleBackClick={handleBackClick} handleHabitFormSubmit={handleHabitFormSubmit} />
                </>
            ) : (
                <></>
            )}
        </>
    );
}

export default HabitTracker;