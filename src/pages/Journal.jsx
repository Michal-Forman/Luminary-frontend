import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import JournalForm from "../components/journalForm";
import backendUrl from "../components/Config";
import JournalReadOnly from "../components/JournalReadOnly";
import Navbar from "../components/Navbar";

function Journal() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    const [creatingJournal, setCreatingJournal] = useState(false);
    const [journal, setJournal] = useState([{}]);
    const [selectedJournal, setSelectedJournal] = useState(null);

    const navigate = useNavigate();

    const fetchJournals = () => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            fetch(`${backendUrl}/journals/${user._id}`)
                .then((res) => res.json())
                .then((data) => setJournal(data))
                .catch((error) => {
                    console.error(error);
                    // Handle any fetch errors here
                });
        }
    };

    useEffect(() => {
        fetchJournals();
    }, []); // Fetch journals on component mount

    function handleWriteButtonClick() {
        setCreatingJournal(true);
    }


    const handleJournalFormSubmit = () => {
        setCreatingJournal(false);
        fetchJournals(); // Fetch journals after form submission
    };

    const showJournal = (journal) => {
        setSelectedJournal(journal);
    }

    const handleGoBack = () => {
        setSelectedJournal(null);
    }

    const handleDeleteJournal = () => {
        fetchJournals();
    }

    return (
        <>
            <Navbar/>
            <div className="journalTitleContainer">
                <h1 className="journalTitle registerTitle">Journal</h1>
            </div>
            <div className="journalDatesContainer">
                {journal.map((journalItem, index) => (
                    <div onClick={() => showJournal(journalItem)} key={index}>
                        <div className="journalDateContainer">
                            <h1 className="journalDateDisplayed">{journalItem.date}</h1>
                        </div>
                    </div>
                ))}
            </div>
            <div className="writeButton">
                <img className="writeButtonImage" src={require("../IMG/writeButton1.png")} onClick={handleWriteButtonClick}/>
            </div>
            {selectedJournal && <JournalReadOnly journal={selectedJournal} handleGoBack={handleGoBack}
                                                 handleDeleteJournal={handleDeleteJournal}/>}
            {creatingJournal ? (
                <>
                    <div className="modalOverlay"></div>
                    <JournalForm onBackClick={() => setCreatingJournal(false)} onSubmit={handleJournalFormSubmit} journals={journal}/>
                </>
            ) : (
                <></>
            )}
        </>
    );
}

export default Journal;