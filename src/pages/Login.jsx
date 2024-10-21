import React from "react";
import LoginForm from "../components/LoginForm";
import '../styles/LoginForm.css';

function Login ({ setAuthenticated }) {
    return(
        <div className="body">
            <LoginForm setAuthenticated={setAuthenticated}/>
        </div>
    );
}

export default Login;