import { MainLayout } from "./mainLayout";
import React, {useState, useEffect} from 'react';

//useeffect for auto display data to screen without button to refresh

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import {getDatabase, set, get, update, remove, ref, child, push, onValue, query} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();
const auth = getAuth(app);
const dbRef = ref(db);

async function getData(){
  const dbref = ref(db);
  const dataArea = document.getElementById("scrapData");
  get(child(dbref, "WorldCupHeadlines"))
  .then((snapshot) => {
    if(snapshot.exists()){
      for (const object in snapshot.val()){
        for (const property in snapshot.val()[object]){
          console.log(snapshot.val()[object][property]);
          dataArea.innerHTML = dataArea.innerHTML + snapshot.val()[object][property] + "<br>";
        }
      }
    }
  })
}

setTimeout(getData, 1000);

const WorldCup = () => {


    return <div className="page">
      <MainLayout>
        <div id = "scrapData">

        </div>
      </MainLayout>
    </div>
}

export default WorldCup;
