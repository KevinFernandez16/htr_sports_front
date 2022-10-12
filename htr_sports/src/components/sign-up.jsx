



import React, { useState } from 'react';
import Overlay from './overlay';
import './sign-up.css';


const SignUpOverlay = ({ isOpen, onClose }) => {


    return (
        <Overlay isOpen={isOpen}>
            <button className='close-btn' onClick={onClose}>X</button>
            {/* <div>LOGIN FORM HERE</div>  */}
            <div class = "sign-up-form">
            <h1>Sign Up</h1>
            {/* <!-- Creating our Sign up container --> */}
                <form method="post">
                    <div class = "txt_field_signup">
                        <input type="text" name="firstName" id="firstName" placeholder="First Name" />
                        { /* <!-- Creating the text boxes for First name and Last name --> */}
                    </div>

                    <div class = "txt_field_signup">
                        <input type="text" name="lastName" id="lastName" placeholder="Last Name" />
                        {/* <!-- Creating the text boxes for First name and Last name --> */}
                    </div>

                    <div class = "txt_field_signup">
                        <input type="email" name="email" id="email" placeholder="Email" />
                        {/* <!-- Creating Email text box --> */}
                    </div>

                    <div class = "txt_field_signup">
                        <input type="tel" name="phonenumber" id="phonenumber" placeholder="Phone Number" />
                        {/* <!-- Creating text box for user's phone numbers --> */}
                    </div>

                    <div class = "txt_field_signup">
                        <input type="password" name="password" id="password" placeholder="Password" />
                        {/* <!-- Creating text box for user's to enter their password --> */}
                    </div>

           

                    <div class = "form-button">
                        <button class="signUp" type="Submit">Sign Up</button>
                        {/* <!-- Creating the Sign Up button for user's to submit all their entered information --> */}
                        <div class = "having-an-account">
                            <p>Already have an account ? <a href="login.html">Login Here</a></p>
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
            <div   onClick={openSignUpOverlay}>
                <a>signup</a>
            </div>
        </li>
    )

}

export default SignUp;