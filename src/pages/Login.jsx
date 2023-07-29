import React, {useRef, useState} from "react";
import {json, useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import BackendUrl from "../components/Config";
import backendUrl from "../components/Config";

function Login() {

    const emailRef = useRef("");
    const passwordRef = useRef("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");
    const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);


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
        const password = passwordRef.current.value;

        const data = {
            email: email,
            password: password
        };

        try {
            const response = await fetch(`${backendUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Handle successful response
                console.log("Login successful!");
                const jsonData = await response.json();
                // Update global registration state
                try {
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: {user: jsonData.message}, // Pass the user data to the action payload
                    });
                } catch (error) {
                    console.log("Error:", error);
                }
                // Navigate to home page
                navigate("/home");
            } else {
                // Handle error response
                console.log("Wrong user details!");
                setErrorMessage("Invalid email or password");
                setIsPasswordIncorrect(true);

            }
        } catch (error) {
            // Handle network error
            console.log("Network error");
            setErrorMessage('Network error');
        }
    }

    return (
        <>
            <form className="loginForm" onSubmit={handleSubmit}>
                <div className="loginTitleDiv">
                    <h1 className="title">Login</h1>
                </div>
                <div className="loginEmailDiv">
                    <label htmlFor="emailInput">email:</label>
                    <input
                        type="email"
                        className="registerInput emailInput"
                        id="emailInput"
                        ref={emailRef}
                        placeholder="e.g. john.doe@gmail.com"
                        required
                    />
                    <div className="toggleLoginPasswordButton" onClick={handleTogglePasswordVisibility}>
                        <img src={require("../IMG/passwordEye.png")} alt="password eye" width="20px" height="20px"/>
                    </div>
                </div>
                <div className="loginPasswordDiv">
                    <label htmlFor="passwordInput">password:</label>
                    <div className="passwordInputContainer">
                        <input
                            type="password"
                            className={isPasswordIncorrect ? "incorrectPasswordInput registerInput passwordInput" : "registerInput passwordInput"}
                            id="passwordInput"
                            ref={passwordRef}
                            placeholder="e.g. password1234"
                            required
                        />
                    </div>
                    {errorMessage && <h3 className="errorMessage">{errorMessage}</h3>}
                </div>
                <div className="loginRegisterDiv">
                    <button type="button" onClick={() => navigate("/")} className="secondaryButton">
                        register
                    </button>
                </div>
                <div className="loginLoginDiv">
                    <button type="submit" className="primaryButton">
                        login
                    </button>
                </div>
            </form>
        </>
    );
}

export default Login;