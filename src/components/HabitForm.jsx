import React, {useState} from "react";
import {useSelector} from "react-redux";
import backendUrl from "./Config";

function HabitForm(props) {

    const userEmail = useSelector((state) => state.auth.user.email);

    const [notFillingOutWholeForm, setNotFillingOutWholeForm] = useState(false);

    async function handleHabitFormSubmit(event) {
        event.preventDefault();

        const habitName = document.getElementById("habitName").value;
        const habitDailyGoal = document.getElementById("habitDailyGoal").value;

        const habit = {
            habitName,
            habitDailyGoal,
            userEmail
        };

        if (habitName === "" || habitDailyGoal === "") {
            setNotFillingOutWholeForm(true);
            return;
        }

        console.log(habit);

        const response = await fetch(`${backendUrl}/habit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(habit)
        })
        props.handleHabitFormSubmit();
        console.log("handleHabitFormSubmit called successfully");
    }

    return (
        <>
            <div className="journalFormContainer habitFormContainer">
                <form className="journalForm">
                    <div className="createJournalTitleContainer">
                        <h1 className="createJournalTitle">Create Habit</h1>
                    </div>
                    <div className="habitFormNameContainer">
                        <label className="habitFormNameLabel" htmlFor="habitName">Name</label>
                        <input className="habitFormNameInput" type="text" id="habitName" name="habitName"
                               placeholder="e.g. Running" autoComplete="off" required={true}/>
                    </div>
                    <div className="habitFormNameContainer">
                        <label htmlFor="habitDailyGoal">Daily goal</label>
                        <input className="habitFormNameInput habitFormDailyGoalInput" type="number" min="1" max="100"
                               id="habitDailyGoal" name="habitDailyGoal" placeholder="e.g. 2" required={true}/>
                    </div>
                    {notFillingOutWholeForm && <p className="errorMessage">All input fields are mandatory</p>}
                    <div className="habitFormButtonsContainer">
                        <button type="button" className="secondaryButton whiteBackground createJournalButton"
                                onClick={props.handleBackClick}>back
                        </button>
                        <button className="primaryButton createJournalButton" onClick={handleHabitFormSubmit}>submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default HabitForm;