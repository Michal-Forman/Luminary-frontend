import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import WorkoutForm from "../components/WorkoutForm";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import backendUrl from "../components/Config";
import ExerciseChanger from "../components/ExerciseChanger";
import ProgressionReadOnly from "../components/ProgressionReadOnly";

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
    const [exerciseProgressionData, setExerciseProgressionData] = useState([{}]);
    const [showingProgression, setShowingProgression] = useState(false);
    const [makingChanges, setMakingChanges] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [selectedExerciseProgressionName, setSelectedExerciseProgressionName] = useState(null);

    const fetchExercises = () => {
        fetch(`${backendUrl}/exercise/${user._id}`)
            .then((res) => res.json())
            .then((data) => setExercises(data))
            .catch((error) => {
                console.error(error);
            });
    };

    const handleHabitButtonClick = () => {
        setCreatingExercise(true);
    }

    const handleBackClick = () => {
        setCreatingExercise(false);
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

    const handleExerciseProgressionBackClick = () => {
        setShowingProgression(false);
    }

    const handleShowProgression = async (event, exerciseId, exerciseName) => {
        event.stopPropagation();
        setSelectedExerciseProgressionName(exerciseName);
        try {
            const response = await fetch(`${backendUrl}/exercise_progression/${exerciseId}`);
            if (response.ok) {
                const data = await response.json();
                setExerciseProgressionData(data);
                setShowingProgression(true);
                console.log("Fetched data:", data); // Log the fetched data here
            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar/>
            <div className="titleContainer">
                <h1 className="title">Workout Tracker</h1>
                {exerciseProgressionData && console.log(exerciseProgressionData)}
            </div>
            <div className="exercisesContainer">
                {exercises.map((exercise, index) => (
                    <>
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
                        <button onClick={(event) => handleShowProgression(event, exercise._id, exercise.name)} className="primaryButton showProgressButton">show progress</button>
                    </div>
                    </>
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
            {showingProgression ? (
                <>
                    <div className="modalOverlay"></div>
                    <ProgressionReadOnly handleExerciseProgressionBackClick={handleExerciseProgressionBackClick} exerciseProgressionData={exerciseProgressionData} exerciseName={selectedExerciseProgressionName}/>
                </>
            ) : (
                <></>)}
        </>
    );
}

export default WorkoutTracker;