import React, { useState, useEffect } from 'react';
import Overlay from './overlay';
import './sign-up.css';

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

const defaultData = {
  DisplayName: "Anonymous",
  Email: "",
  Password: "",
  PhoneNumber: 0,
  ProfilePicture: "None",
  BannerPicture: "None",
  //TestData: "Default",
  //TestData2: "Default2",
  ShopData: {
    Item1: false,
    Item2: false
  }
}

const removeData = {
  TestData: true,
  TestData2: true,
}

function updateExistingData(){
  const user = auth.currentUser;
  if (user){
    const dbref = ref(db)
    get(child(dbref, "Users/" + user.uid))
    .then((snapshot) => {
      if(snapshot.exists()){
        /*for (const [index, name] of defaultData.entries){
          console.log('Index: ${index}, holds ${name}');
        }*/
        for (const [key, value] of Object.entries(defaultData)) {
          console.log(key);
          if (snapshot.val()[key] != null){
            console.log("Found");

            if (removeData[key] == true){
              console.log("Deleted");
              const updates = {};
              updates["Users/"+user.uid+"/"+key] = null;
              update(dbref,updates);
            }

          }else{
            console.log("Not found, must create");

            const updates = {};
            updates["Users/"+user.uid+"/"+key] = value;
            update(dbref,updates);
          }
          console.log('------------------------------')
        }
      }
    })
  }
}


function createAccount(name,email,number,password){
  //alert("Clicked");
  //const dbref = ref(db)
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log("Just made an account!");

    var NewData = defaultData
    NewData.DisplayName = name;
    NewData.Email = email;
    NewData.Password = password;
    NewData.PhoneNumber = number;
    set(ref(db, 'Users/'+user.uid),/*{
      DisplayName: "Anonymous",
      Email: email,
      Password: password,
      ProfilePicture: "None",
      //Email: user.value,
    }*/defaultData)
    .then(()=>{
      console.log("Data created")
      window.location.reload(false);
    })
    .catch((error)=>{
      alert(error);
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    //alert(errorCode+" : "+errorMessage);
    //console.log(errorCode+":"+errorMessage);
    if (errorCode == "auth/email-already-in-use"){
      console.log('in use');
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Logged in to existing")
        updateExistingData();
        console.log(userCredential);
        // ...
      })
      .catch((error) => {
        const nerrorCode = error.code;
        const nerrorMessage = error.message;
        alert(nerrorCode+" : "+nerrorMessage);
        console.log(nerrorCode+":"+nerrorMessage);
      });
    }
  });
}


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
        const errors = validate(formValues)
        setFormErrors(errors);
        setIsSubmit(true);
        if (Object.keys(errors).length == 0){
          createAccount(formValues.username,formValues.email,formValues.phonenumber,formValues.password);
        }else{
          console.log('Has error');
        }
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
                            <h8>Already have an account ? Try to login instead!</h8>
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
