import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import BackendUrl from "./Config";

function Register() {
    const emailRef = useRef("");
    const firstNameRef = useRef("");
    const lastNameRef = useRef("");
    const passwordRef = useRef("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userAlreadyExists, setUserAlreadyExists] = useState(false);

    const handleTogglePasswordVisibility = () => {
        const passwordInput = passwordRef.current;
        if (passwordInput) {
            passwordInput.type =
                passwordInput.type === "password" ? "text" : "password";
        }
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const email = emailRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const password = passwordRef.current.value;

        const data = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
        };

        try {
            const response = await fetch(`${BackendUrl}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const jsonData = await response.json();

                // Handle successful response
                console.log("Registration successful!");
                // Update global registration state
                try {
                    dispatch({
                        type: 'REGISTER_SUCCESS',
                        payload: {user: jsonData.message}, // Pass the user data to the action payload
                    });
                } catch (error) {
                    console.log("Error:", error);
                }
                navigate("/home");
            } else {
                // Handle error response
                console.log("User already exists.");
                setUserAlreadyExists(true);
            }
        } catch (error) {
            // Handle network error
            console.log("Network error:", error);
        }
    }

    // If the user is not registered, show the registration form
    return (
        <div>
            <form className="registerForm" onSubmit={handleSubmit}>
                <div className="titleDiv">
                    <h1 className="registerTitle">Register</h1>
                </div>
                <div className="emailDiv">
                    <label htmlFor="emailInput">email:</label>
                    <input
                        type="email"
                        className="registerInput emailInput"
                        id="emailInput"
                        ref={emailRef}
                        placeholder="e.g. john.doe@gmail.com"
                        required
                    />
                </div>
                <div className="firstNameDiv">
                    <label htmlFor="firstNameInput">first name:</label>
                    <input
                        type="text"
                        className="registerInput firstNameInput"
                        id="firstNameInput"
                        ref={firstNameRef}
                        placeholder="e.g. John"
                        required
                    />
                    <div className="togglePasswordButton" onClick={handleTogglePasswordVisibility}>
                        <img src={require("../IMG/passwordEye.png")} alt="password eye" width="20px" height="20px"/>
                    </div>
                </div>
                <div className="lastNameDiv">
                    <label htmlFor="lastNameInput">last name:</label>
                    <input
                        type="text"
                        className="registerInput lastNameInput"
                        id="lastNameInput"
                        ref={lastNameRef}
                        placeholder="e.g. Doe"
                        required
                    />
                </div>
                <div className="passwordDiv">
                    <label htmlFor="passwordInput">password:</label>
                    <div className="passwordInputContainer">
                        <input
                            type="password"
                            className="registerInput passwordInput"
                            id="passwordInput"
                            ref={passwordRef}
                            placeholder="e.g. password1234"
                            required
                        />
                    </div>
                    {userAlreadyExists && <h3 className="errorMessage">User already exists.</h3>}
                </div>
                <div className="loginDiv">
                    <button onClick={() => navigate("/login")} type="button" className="secondaryButton">
                        login
                    </button>
                </div>
                <div className="registerDiv">
                    <button className="primaryButton" type="submit">
                        register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
