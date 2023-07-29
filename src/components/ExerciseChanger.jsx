import React from "react";
import backendUrl from "./Config";

function ExerciseChanger(props) {



    const handleDeleteExercise = () => {
        fetch(`${backendUrl}/exercise/${props.exercise._id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (res.ok) {
                    console.log("Exercise deleted successfully");
                    props.handleDeleteExercise();
                }
            })
            .catch((error) => {
                console.error(error);
                // Handle any fetch errors here
            });
    }

    const handleChangeExercise = () => {

        const exerciseId = props.exercise._id;
        const exerciseName = document.getElementById("exerciseName").value;
        const exerciseWeight = parseFloat(document.getElementById("exerciseWeight").value);
        const repetition1 = parseInt(document.getElementById("exerciseRepetition1").value, 10);
        const repetition2 = parseInt(document.getElementById("exerciseRepetition2").value, 10);
        const repetition3 = parseInt(document.getElementById("exerciseRepetition3").value, 10);

        const exercise = {
            exerciseId,
            exerciseName,
            exerciseWeight,
            repetition1,
            repetition2,
            repetition3,
        };

        console.log(exercise);

        fetch(`${backendUrl}/exercise/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(exercise),
        })
            .then((res) => {
                if (res.ok) {
                    console.log("Exercise updated successfully");
                    props.handleDeleteExercise();
                }
            })
            .catch((error) => {
                console.error(error);
                // Handle any fetch errors here
            });
    }

    return (
        <>
            <div className="journalFormContainer habitFormNameContainer workoutFormContainer">
                <form className="journalForm">
                    <div className="createJournalTitleContainer">
                        <h1 className="createJournalTitle">Change Exercise</h1>
                    </div>
                    <div className="habitFormNameContainer">
                        <label className="habitFormNameLabel" htmlFor="exerciseName">Name</label>
                        <input className="habitFormNameInput" type="text" id="exerciseName" name="exerciseName"
                               placeholder="e.g. Benchpress" autoComplete="off" required={true} defaultValue={props.exercise.name}/>
                    </div>
                    <div className="habitFormNameContainer">
                        <label className="habitFormNameLabel" htmlFor="exerciseWeight">Weight (kg)</label>
                        <input className="habitFormNameInput workoutFormWeightInput" type="number" id="exerciseWeight"
                               name="exerciseWeight"
                               placeholder="e.g. 6" autoComplete="off" required={true} min="0" step="0.5" defaultValue={props.exercise.weight}/>
                    </div>
                    <div className="subtitleDiv">
                        <h2 className="repetitionsTitle">Repetitions</h2>
                    </div>
                    <div className="habitFormNameContainer workoutFormRepetitionsContainer">
                        <div className="firstSetDiv repetitionsDiv">
                            <label className="habitFormNameLabel" htmlFor="exerciseRepetition1">1st set</label>
                            <input className="habitFormNameInput workoutFormSetInput workoutFormWeightInput" type="number"
                                   id="exerciseRepetition1" name="exerciseRepetition1" min="0" placeholder="e.g. 8" required={true} defaultValue={props.exercise.repetition1}/>
                        </div>
                        <div className="secondSetDiv repetitionsDiv">
                            <label className="habitFormNameLabel" htmlFor="exerciseRepetition2">2nd set</label>
                            <input className="habitFormNameInput workoutFormSetInput workoutFormWeightInput" type="number"
                                   id="exerciseRepetition2" name="exerciseRepetition2" min="0" placeholder="e.g. 8" required={true} defaultValue={props.exercise.repetition2}/>
                        </div>
                        <div className="thirdSetDiv repetitionsDiv">
                            <label className="habitFormNameLabel" htmlFor="exerciseRepetition3">3rd set</label>
                            <input className="habitFormNameInput workoutFormSetInput workoutFormWeightInput" type="number"
                                   id="exerciseRepetition3" name="exerciseRepetition3" min="0" placeholder="e.g. 8" required={true} defaultValue={props.exercise.repetition3}/>
                        </div>
                    </div>

                    <div className="habitFormButtonsContainer workoutFormButtonContainer">
                        <button type="button" className="secondaryButton whiteBackground createJournalButton changeExerciseButton"
                                onClick={props.handleBackClick}>back
                        </button>
                        <button type="button" className="secondaryButton journalDeleteButton ExerciseDeleteButton changeExerciseButton" onClick={handleDeleteExercise}>delete</button>
                        <button type="button" className="primaryButton createJournalButton changeExerciseButton" onClick={handleChangeExercise}>submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ExerciseChanger;