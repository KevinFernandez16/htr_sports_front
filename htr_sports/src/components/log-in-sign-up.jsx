import React, { useState, useEffect } from 'react';
import Overlay from './overlay';
import './log-in-sign-up.css';

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
        setFormErrors(validate(formValues));// pass form values when submitting
        setIsSubmit(true);
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
            errors.username = "Username is required!";
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
                            <label>Username</label>

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