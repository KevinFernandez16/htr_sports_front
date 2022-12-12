import Paths from "../utils/route";
import LogInSignUp from "./log-in-sign-up";
import SignUp from "./sign-up";
import SignOut from "./signout";
import "./Header.css";
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

const HeaderItem = ({ name, path }) => {
  const uid = ''
  const user = auth.currentUser;
  //console.log(name);
  if (user && name == "My Profile"){
    //console.log('in profile')
    path = path + "/" + user.uid;
  }

  return (
      <li>
          {/* TODO: use link component from react route */}
          <a id = {name} href={path}>{name}</a>
      </li>
  )
}

setTimeout(function(){
  const user = auth.currentUser;
  if (user){
    console.log(user.uid);
    const profileButton = document.getElementById("My Profile");
    profileButton.setAttribute('href','/profile/'+user.uid);
  }
}, 500);

const Header = () => {

    return (
        <header>
            <div className="container">
                <nav>
                    <ul className="header-list">
                        {/* {Paths.map(({name, path}) => <HeaderItem key={name} name={name} path={path} />)} */}

                            {/* <img
                            className="logo"
                            src="images/logo_both.png"
                            style={{ width: '15%', height: '15%', display: 'block' }}

                            ></img> */}

                        <HeaderItem name={Paths.home.name} path={Paths.home.path}/>
                        <HeaderItem name={Paths.soccer.name} path={Paths.soccer.path}/>
                        <HeaderItem name={Paths.basketball.name} path={Paths.basketball.path}/>
                        {/* <HeaderItem name={Paths.fantasy.name} path={Paths.fantasy.path}/> */}
                        <HeaderItem name={Paths.worldCup.name} path={Paths.worldCup.path}/>
                        <HeaderItem name={Paths.forum.name} path={Paths.forum.path}/>
                        <HeaderItem name={Paths.find.name} path={Paths.find.path}/>
                        <HeaderItem name={Paths.profileid.name} path={Paths.profileid.path}/>
                        <SignUp/>
                        <LogInSignUp />
                        <SignOut/>
                    </ul>
                </nav>
            </div>
        </header>

    )
};

export default Header;
