import React from "react";
import backendUrl from "./Config";

const JournalReadOnly = ({journal, handleGoBack, handleDeleteJournal}) => {

    const numMoodStat = parseInt(journal.mood, 10);

    let face = '🙂'; // Normal face
    if (numMoodStat >= 0 && numMoodStat <= 33) {
        face = '😔'; // Sad face
    } else if (numMoodStat >= 34 && numMoodStat <= 66) {
        face = '🙂'; // Normal face
    } else if (numMoodStat >= 67 && numMoodStat <= 100) {
        face = '😊'; // Happy face
    }

    const deleteJournal = () => {
        fetch(`${backendUrl}/journals/${journal._id}`, {
            method: "DELETE"
        })
            .then((res) => {
                if (res.ok) {
                    console.log("Journal deleted successfully");
                    handleGoBack();
                    handleDeleteJournal();
                } else {
                    console.error("Failed to delete journal");
                }
            })
            .catch((error) => {
                console.error(error);
                // Handle any fetch errors here
            });
    };

    return (
        <>
            <div className="modalOverlay"></div>
            <div className="journalFormContainer animatedJournal">
                <h1 className="createJournalTitle">{journal.date}</h1>
                <h2 className="journalSubTitle">Mood</h2>
                <h2 className="journalMoodStat">{journal.mood}%</h2>
                <h2 className="journalMoodFace">{face}</h2>
                <h2 className="journalSubTitle">Content</h2>
                <div className="journalScrollableText">
                    <p className="journalContentText">{journal.content}</p>
                </div>
                <div className="journalReadOnlyButtonsContainer">
                    <button className="secondaryButton journalDeleteButton" onClick={deleteJournal}>Delete</button>
                    <button className="journalReadOnlyGoBackButton secondaryButton" onClick={handleGoBack}>Back</button>
                </div>
            </div>
        </>
    );
};

export default JournalReadOnly;
