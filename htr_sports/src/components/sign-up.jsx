import React, { useState, useEffect } from 'react';
import Overlay from './overlay';
import './sign-up.css';

const SignUpOverlay = ({ isOpen, onClose }) => {

    const initialValues = { username: "", email: "", phonenumber: "", password: "" }; //initial state
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {// if isSubmit and no errors (obj of errorforms)
            console.log(formValues);
        }
    }, [formErrors])

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+.[^\s@]{2,}$/i;
        const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if (!values.username) {
            errors.username = "Username is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid email format!";
        }
        if (!values.phonenumber) {
            errors.phonenumber = "Phone Number is required!";
        } else if (!phoneno.test(values.phonenumber)) {
            errors.phonenumber = "Invalid phone number format"
        }
        if (!values.password) {
            errors.password = "Password is required!";
        } else if (values.password.length < 6) {
            errors.password = "Password must be atleast 6 characters";
        }

        return errors;
    }

    return (
        <Overlay isOpen={isOpen} >
            <button className='close-btn' onClick={onClose}>X</button>
            {/* <div>LOGIN FORM HERE</div>  */}
            {/* <pre style={{ color: 'blue' }}>{JSON.stringify(formValues, undefined, 2)}</pre> */}
            <div class="sign-up-form">
                <h1 className='signup-title'>Sign Up</h1>
                {/* <!-- Creating our Sign up container --> */}
                <form method="post" onSubmit={handleSubmit}>

                    <div class="txt_field_signup">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formValues.username}
                            onChange={handleChange}
                        />

                    </div>
                    <p>{formErrors.username}</p>
                    <div class="txt_field_signup">
                        <input
                            // type="email" 
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                        {/* <!-- Creating Email text box --> */}
                    </div>
                    <p>{formErrors.email}</p>
                    <div class="txt_field_signup">
                        <input
                            type="tel"
                            name="phonenumber"
                            id="phonenumber"
                            placeholder="Phone Number"
                            value={formValues.phonenumber}
                            onChange={handleChange}
                        />
                        {/* <!-- Creating text box for user's phone numbers --> */}
                    </div>
                    <p>{formErrors.phonenumber}</p>
                    <div class="txt_field_signup">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                        {/* <!-- Creating text box for user's to enter their password --> */}
                    </div>
                    <p>{formErrors.password}</p>
                    <div style={{ paddingTop: '10px' }}>
                        <button class="signUp" type="Submit">Sign Up</button>
                        {/* <!-- Creating the Sign Up button for user's to submit all their entered information --> */}
                        <div class="having-an-account">
                            <h8>Already have an account ? <a href="login.html">Login Here</a></h8>
                            {/* <!-- If a user has an account made already, they can log in throught our log in page  --> */}
                        </div>
                    </div>
                </form>
            </div>
        </Overlay>
    )
};

const SignUp = () => {
    const [open, setOpen] = useState(false);

    const openSignUpOverlay = () => {
        setOpen(true);
    }

    const closeSignUpOverlay = () => {
        setOpen(false);
    }

    return (
        <li>
            <SignUpOverlay isOpen={open} onClose={closeSignUpOverlay} />
            <div onClick={openSignUpOverlay} style={{ cursor: 'pointer' }}>
                <a>signup</a>
            </div>
        </li>
    )

}

export default SignUp;