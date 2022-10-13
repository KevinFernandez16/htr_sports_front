import React, { useState } from 'react';
import Overlay from './overlay';
import './log-in-sign-up.css';

const LogInOverlay = ({ isOpen, onClose }) => {


    return (
        <Overlay isOpen={isOpen}>
            <button className='close-btn' onClick={onClose}>X</button>
            {/* <div>LOGIN FORM HERE</div>  */}
            <div className='container-login'>
                <div class = "center">
                    <h1>Login</h1>
                    <form method="post">
                        <div class="txt_field">
                            <input type="text" required />
                            <span></span>
                            <label>Username</label>
                        </div>
                        <div class="txt_field">
                            <input type="password" required />
                            <span></span>
                            <label>Password</label>
                        </div>
                        <div class="pass">Forgot Password?</div>
                
                        <input type="submit" value="Login" />
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
            <div style={{ width: '30px', height: '30px' }} onClick={openLogInOverlay}>
                <img
                    src={'images/profile.png'}
                    style={{ width: '100%', height: '100%', display: 'block' }}
                />
            </div>
        </li>
    )

}

export default LogInSignUp;
//login-signup