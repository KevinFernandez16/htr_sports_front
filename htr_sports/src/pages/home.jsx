import { MainLayout } from "./mainLayout";
//import {test} from "../index.js"
import Carousel from "../components/Carousel";
import "./Pages.css";

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

var email = ""
var password = ""

const defaultData = {
  DisplayName: "Anonymous",
  Email: email,
  Password: password,
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

const Home = () => {
  return <div>
    <MainLayout>
      <div className="page">
        <Carousel/>
      </div>
    </MainLayout>
  </div>
}

export default Home;
