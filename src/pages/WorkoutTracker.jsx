import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import WorkoutForm from "../components/WorkoutForm";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import backendUrl from "../components/Config";
import ExerciseChanger from "../components/ExerciseChanger";

function WorkoutTracker() {


    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            fetchExercises();
        }
    }, []);

    const [creatingExercise, setCreatingExercise] = useState(false);
    const [exercises, setExercises] = useState([{}]);
    const [makingChanges, setMakingChanges] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);

    const fetchExercises = () => {
        fetch(`${backendUrl}/exercise/${user._id}`)
            .then((res) => res.json())
            .then((data) => setExercises(data))
            .catch((error) => {
                console.error(error);
                // Handle any fetch errors here
            });
    };

    const handleHabitButtonClick = () => {
        setCreatingExercise(true);
    }

    const handleBackClick = () => {
        setCreatingExercise(false);
        console.log("back button clicked");
    }

    const handleExerciseFormSubmit = () => {
        setCreatingExercise(false);
        fetchExercises();
    }

    const showOptions = (exercise) => {
        console.log("show options");
        setMakingChanges(true);
        setSelectedExercise(exercise);
    }

    const handleExerciseChangingBackClick = () => {
        setMakingChanges(false);
    }

    const handleDeleteExercise = () => {
        fetchExercises();
        setMakingChanges(false);
    }

    return (
        <>
            <Navbar/>
            <div className="titleContainer">
                <h1 className="title">Workout Tracker</h1>
            </div>
            <div className="exercisesContainer">
                {exercises.map((exercise, index) => (
                    <div className="exerciseContainer" key={index} onClick={() => showOptions(exercise)}>
                        <div className="exerciseNameDiv journalDateContainer exerciseParamContainer">
                            <h2 className="journalDateDisplayed">{exercise.name}</h2>
                        </div>
                        <div className="exerciseWeightDiv journalDateContainer exerciseParamContainer">
                            <h2 className="journalDateDisplayed">{exercise.weight}</h2>
                        </div>
                        <div className="exerciseRepetitionsDiv journalDateContainer exerciseParamContainer">
                            <h2 className="journalDateDisplayed">{exercise.repetition1}-</h2>
                            <h2 className="journalDateDisplayed">{exercise.repetition2}-</h2>
                            <h2 className="journalDateDisplayed">{exercise.repetition3}</h2>
                        </div>

                    </div>
                ))}
            </div>
            <div className="writeButton">
                <img onClick={handleHabitButtonClick} className="habitTrackerImage"
                     src={require("../IMG/addHabitButton.png")}/>
            </div>
            {creatingExercise ? (
                <>
                    <div className="modalOverlay"></div>
                    <WorkoutForm handleBackClick={handleBackClick} handleExerciseFormSubmit={handleExerciseFormSubmit}/>
                </>
            ) : (
                <></>)}
            {makingChanges ? (
                <>
                    <div className="modalOverlay"></div>
                    <ExerciseChanger handleBackClick={handleExerciseChangingBackClick} exercise={selectedExercise} handleDeleteExercise={handleDeleteExercise}/>
                </>

            ) : (
                <></>)}
        </>
    );
}

export default WorkoutTracker;