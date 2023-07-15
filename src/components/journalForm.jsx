import React, {useState} from "react";
import BackendUrl from "./Config";
import {useSelector} from "react-redux";

function JournalForm(props) {

    const userEmail = useSelector((state) => state.auth.user.email);

    const [moodValue, setMoodValue] = useState(50);
    const [moreJournals, setMoreJournals] = useState(false);

    const date = new Date();
    const today = date.getDate() + ". " + (date.getMonth() + 1) + ". " + date.getFullYear();

    const handleMoodChange = (e) => {
        setMoodValue(parseInt(e.target.value, 10));
    };

    let face = '🙂'; // Normal face


    if (moodValue >= 0 && moodValue <= 33) {
        face = '😔'; // Sad face
    } else if (moodValue >= 34 && moodValue <= 66) {
        face = '🙂'; // Normal face
    } else if (moodValue >= 67 && moodValue <= 100) {
        face = '😊'; // Happy face
    }

    async function handleJournalSubmit(event) {
        event.preventDefault();

        console.log(props.journals);

        const journalWithTodayDate = props.journals.find((journalItem) => journalItem.date === today);

        if (journalWithTodayDate) {
            setMoreJournals(true);
            return;
        }

        const mood = moodValue;
        const content = document.getElementById("journalContent").value;
        const date = today;

        const journal = {
            mood,
            content,
            date,
            userEmail
        };

        console.log(journal);

        const response = await fetch(`${BackendUrl}/journal`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(journal)
        });

        if (response.status === 201) {
            props.onSubmit();
        }
    }

    return (
        <>
            <div className="journalFormContainer animatedJournal" onSubmit={handleJournalSubmit}>
                <form className="journalForm">
                    <div className="createJournalTitleContainer"><h1 className="createJournalTitle">{today}</h1></div>
                    <div className="createJournalMoodContainer">
                        <label className="journalFormLabel" htmlFor="journalMood">Mood</label>
                        <input className="journalFormInput journalMoodInput" type="range" min="0" max="100" step="1"
                               id="journalMood" name="journalMood"
                               placeholder="e.g. My first journal entry" onChange={handleMoodChange}/>
                        <h2>{face}</h2>
                    </div>
                    <div className="createJournalContentContainer">
                        <label className="journalFormLabel" htmlFor="journalContent">Content</label>
                        <textarea className="journalFormInput journalContentInput" id="journalContent"
                                  name="journalContent"
                                  placeholder="What was your day like?"/>
                    </div>
                    {moreJournals && <p className="errorMessage">You have already created a journal for today.</p>}
                    <div className="createJournalButtonsContainer">
                        <button className="secondaryButton whiteBackground createJournalButton" type="button" onClick={props.onBackClick}>back</button>
                        <button className="primaryButton createJournalButton" type="submit">submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default JournalForm;