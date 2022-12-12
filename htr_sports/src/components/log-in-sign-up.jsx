import React, { useState, useEffect } from 'react';
import Overlay from './overlay';
import './log-in-sign-up.css';

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import { getDatabase, set, get, update, remove, ref, child } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getStorage, ref as storageref, uploadBytes, getDownloadURL, deleteObject }  from "https://www.gstatic.com/firebasejs/9.9.4/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBoF3DW_pIDocCRPlrqFpUfxdXtCT7lpFQ",
  authDomain: "htr-sports.firebaseapp.com",
  databaseURL: "https://htr-sports-default-rtdb.firebaseio.com",
  projectId: "htr-sports",
  storageBucket: "htr-sports.appspot.com",
  messagingSenderId: "119767757957",
  appId: "1:119767757957:web:d9f4cfeed391dc8bbde5ec",
  measurementId: "G-WEB0Z72L02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();

const auth = getAuth(app)

function logIn(email,password){
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log("Logged in to existing")
    console.log(userCredential);
    window.location.reload(false);
    // ...
  })
  .catch((error) => {
    const nerrorCode = error.code;
    const nerrorMessage = error.message;
    alert(nerrorCode+" : "+nerrorMessage);
    console.log(nerrorCode+":"+nerrorMessage);
  });
}

const LogInOverlay = ({ isOpen, onClose }) => {

    const initialValues = { username: "", password: "" }; //initial state
    const [formValues, setFormValues] = useState(initialValues); // create state
    const [formErrors, setFormErrors] = useState({}); // state for errors
    const [isSubmit, setIsSubmit] = useState(false);//Submit flag

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate(formValues)
        setFormErrors(errors);// pass form values when submitting
        setIsSubmit(true);

        if (Object.keys(errors).length == 0){
          logIn(formValues.username,formValues.password);
        }else{
          console.log('Has error');
        }
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {// if isSubmit and no errors
            console.log(formValues);
        }
    }, [formErrors])

    const validate = (values) => {
        const errors = {}// errors object

        //check for values
        if (!values.username) {
            errors.username = "Email is required!";
        }
        if (!values.password) {
            errors.password = "Password is required!";
        }

        return errors;
    };

    return (
        <Overlay isOpen={isOpen}>
            <button className='close-btn' onClick={onClose}>X</button>
            {/* <div>LOGIN FORM HERE</div>  */}
            <div className='container-login'>
                {/* <pre style={{ color: 'blue' }}>{JSON.stringify(formValues, undefined, 2)}</pre> */}
                <div class="center">
                    <h1 className='login-title'>Login</h1>
                    <form
                        method="post"
                        onSubmit={handleSubmit}
                    >
                        <div class="txt_field">
                            <input
                                type="text"
                                name="username"
                                value={formValues.username}
                                onChange={handleChange}
                            />
                            <span></span>
                            <label>Email</label>

                        </div>
                        <p> {formErrors.username} </p>
                        <div class="txt_field">
                            <input
                                type="password"
                                name='password'
                                value={formValues.password}
                                onChange={handleChange}
                            />
                            <span></span>
                            <label>Password</label>
                        </div>
                        <p> {formErrors.password} </p>
                        <div class="pass">Forgot Password?</div>

                        <input type="submit" value="Submit" />
                        {/* <button className='submit-btn'> Submit </button> */}
                        <div class="signup_link">
                            Not a member? <a href="signup.html"> signup</a>
                        </div>
                    </form>
                </div>
            </div>
        </Overlay>
    )
};

const LogInSignUp = () => {
    const [open, setOpen] = useState(false);

    const openLogInOverlay = () => {
        setOpen(true);
    }

    const closeLogInOverlay = () => {
        setOpen(false);
    }

    return (
        <li>
            <LogInOverlay isOpen={open} onClose={closeLogInOverlay} />
            <div onClick={openLogInOverlay} style={{ cursor: 'pointer' }}>
                {/* <img (style={{ width: '30px', height: '30px' }})
                    src={'images/profile.png'}
                    style={{ width: '100%', height: '100%', display: 'block' }}
                /> */}
                <a >Login</a>
            </div>
        </li>
    )

}

export default LogInSignUp;
