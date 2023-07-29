import React from "react";
import {useSelector} from "react-redux";
import backendUrl from "./Config";

function WorkoutForm(props) {

    const userEmail = useSelector((state) => state.auth.user.email);

    async function handleExerciseFormSubmit(event) {
        event.preventDefault();

        const exerciseName = document.getElementById("exerciseName").value;
        const exerciseWeight = parseFloat(document.getElementById("exerciseWeight").value);
        const repetition1 = parseInt(document.getElementById("exerciseRepetition1").value, 10);
        const repetition2 = parseInt(document.getElementById("exerciseRepetition2").value, 10);
        const repetition3 = parseInt(document.getElementById("exerciseRepetition3").value, 10);

        const exercise = {
            exerciseName,
            exerciseWeight,
            repetition1,
            repetition2,
            repetition3,
            userEmail
        };

        console.log(exercise);

        const response = await fetch(`${backendUrl}/exercise`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(exercise)
        })
        props.handleExerciseFormSubmit();
    }

    return (
        <div className="journalFormContainer habitFormNameContainer workoutFormContainer">
            <form className="journalForm">
                <div className="createJournalTitleContainer">
                    <h1 className="createJournalTitle">Create Exercise</h1>
                </div>
                <div className="habitFormNameContainer">
                    <label className="habitFormNameLabel" htmlFor="exerciseName">Name</label>
                    <input className="habitFormNameInput" type="text" id="exerciseName" name="exerciseName"
                           placeholder="e.g. Benchpress" autoComplete="off" required={true}/>
                </div>
                <div className="habitFormNameContainer">
                    <label className="habitFormNameLabel" htmlFor="exerciseWeight">Weight (kg)</label>
                    <input className="habitFormNameInput workoutFormWeightInput" type="number" id="exerciseWeight"
                           name="exerciseWeight"
                           placeholder="e.g. 6" autoComplete="off" required={true} min="0" step="0.5"/>
                </div>
                <div className="subtitleDiv">
                    <h2 className="repetitionsTitle">Repetitions</h2>
                </div>
                <div className="habitFormNameContainer workoutFormRepetitionsContainer">
                    <div className="firstSetDiv repetitionsDiv">
                        <label className="habitFormNameLabel" htmlFor="exerciseRepetition1">1st set</label>
                        <input className="habitFormNameInput workoutFormSetInput workoutFormWeightInput" type="number"
                               id="exerciseRepetition1" name="exerciseRepetition1" min="0" placeholder="e.g. 8" required={true}/>
                    </div>
                    <div className="secondSetDiv repetitionsDiv">
                        <label className="habitFormNameLabel" htmlFor="exerciseRepetition2">2nd set</label>
                        <input className="habitFormNameInput workoutFormSetInput workoutFormWeightInput" type="number"
                               id="exerciseRepetition2" name="exerciseRepetition2" min="0" placeholder="e.g. 8" required={true}/>
                    </div>
                    <div className="thirdSetDiv repetitionsDiv">
                        <label className="habitFormNameLabel" htmlFor="exerciseRepetition3">3rd set</label>
                        <input className="habitFormNameInput workoutFormSetInput workoutFormWeightInput" type="number"
                               id="exerciseRepetition3" name="exerciseRepetition3" min="0" placeholder="e.g. 8" required={true}/>
                    </div>
                </div>

                <div className="habitFormButtonsContainer workoutFormButtonContainer">
                    <button type="button" className="secondaryButton whiteBackground createJournalButton"
                            onClick={props.handleBackClick}>back
                    </button>
                    <button className="primaryButton createJournalButton" onClick={handleExerciseFormSubmit}>submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default WorkoutForm;