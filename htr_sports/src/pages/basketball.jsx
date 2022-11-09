import { MainLayout } from "./mainLayout";
import "../pages/css/basketball.css";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import {getDatabase, set, get, update, remove, ref, child, push, onValue, query} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";

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

const dbRef = ref(getDatabase(app));
get(child(dbRef, 'BasketballNews/')).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach(child => {    
      console.log(child.key, child.val());
        });
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
        console.error(error);
});

const Basketball = () => {
  return (
    <div className="basketball">
      <MainLayout>
        <div>
          <h1 className="Headtitle">Welcome to our Basketball Page</h1>
          <div className="flexbox-container">
            <div className="Basketball-Links">
              <h2 className="Titles">Basketball Links</h2>
              <p className="Texts">
                In this containers, there is links being placed that will take
                us to different sections of our basketball page
              </p>
            </div>
            <div className="Basketball-News">
              <h2 className="Titles">Basketball News</h2>
              <p className="Texts">
                In this containers we can add the basketball news that is pulled
                from Carlos' web scraper
              </p>
            </div>
            <div className="Basketball-Widget">
              <h2 className="Titles">Live Basketball Scores</h2>
              <p className="Texts">
                In this section, we will find a basketball widget to display
                live scores
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};export default Basketball;