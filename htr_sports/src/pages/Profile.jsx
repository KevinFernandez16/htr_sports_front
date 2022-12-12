import React from "react";
import "../pages/css/profile.css"
import profileImage from "../pages/images/dummyimage.jpg"
import bannerImage from "../pages/images/dummybanner.png"
import { MainLayout } from "./mainLayout";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import { getDatabase, set, get, update, remove, ref, child } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getStorage, ref as storageref, uploadBytes, getDownloadURL, deleteObject }  from "https://www.gstatic.com/firebasejs/9.9.4/firebase-storage.js";
import aes from "../pages/AES.jsx"

import Crypto from "crypto-js";

function hash(string) {
  /*let bit128 = Crypto.SHA1(string).words.map(function(x){
    console.log(x);
    console.log(aes.decimalToHex(x));
  });*/
  return Crypto.SHA256(string).toString(Crypto.enc.Hex); // return the hash as a hex
}

const secretKey = "internationallol"; //keep key at 16 bits
const textEncrypt = "Here is a secret with a twist"; //password12345678 would be the short key and this would return a hash value
let roundKey = hash(secretKey);

const matrixes = [];
let rounds = 0;
let maxRounds = 15; // uses SHA 256 hashing so it will require 15 rounds to fully run

let messageMatrix = aes.create4X4(textEncrypt);
const secretMatrix = aes.create4X4(secretKey)
const roundKey1 = aes.keySchedule(secretMatrix[0],0); //10 separate keys based on the password given
const roundKey2 = aes.keySchedule(roundKey1,1);
const roundKey3 = aes.keySchedule(roundKey2,2);
const roundKey4 = aes.keySchedule(roundKey3,3);
const roundKey5 = aes.keySchedule(roundKey4,4);
const roundKey6 = aes.keySchedule(roundKey5,5);
const roundKey7 = aes.keySchedule(roundKey6,6);
const roundKey8 = aes.keySchedule(roundKey7,7);
const roundKey9 = aes.keySchedule(roundKey8,8);
const roundKey10 = aes.keySchedule(roundKey9,9);
const keys = [roundKey1,roundKey2,roundKey3,roundKey4,roundKey5,roundKey6,roundKey7,roundKey8,roundKey9,roundKey10]

let secretText = "";

for (let message = 0;message < messageMatrix.length;message++){
  messageMatrix[message] = aes.addRoundKey2(messageMatrix[message],secretMatrix[0]); // does round 0 which is adding the two blocks

  for (let key = 0;key < keys.length;key++){
    aes.initiateRound(messageMatrix[message],keys[key]);
  }
  secretText = secretText + messageMatrix[message].join();
}

secretText = secretText.replaceAll(',','');

console.log(secretText);

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

function updateProfilePicture(){
  const profilePicture = document.getElementById("profilePicture")
  const user = auth.currentUser;
  if (user){
    const dbref = ref(db)
    get(child(dbref, "Users/" + user.uid))
    .then((snapshot) => {
      if(snapshot.exists()){
        if (profilePicture.hasChildNodes()){
          const image = document.getElementById("pfp");
          image.setAttribute('src',snapshot.val().ProfilePicture);
          if (snapshot.val().ProfilePicture == "None"){
              image.src = profileImage;
          }
        }else{
          const image = document.createElement("img");
          image.setAttribute('id','pfp');
          image.setAttribute('alt','Your profile picture');
          image.setAttribute('src',snapshot.val().ProfilePicture);
          profilePicture.appendChild(image);
          if (snapshot.val().ProfilePicture == "None"){
              image.src = profileImage;
          }
        }
      }
    })
  }
}

function updateBanner(){
  const bannerPicture = document.getElementById("bannerPicture")
  const user = auth.currentUser;
  if (user){
    const dbref = ref(db)
    get(child(dbref, "Users/" + user.uid))
    .then((snapshot) => {
      if(snapshot.exists()){
        if (bannerPicture.hasChildNodes()){
          const image = document.getElementById("banner");
          image.setAttribute('src',snapshot.val().BannerPicture);
          if (snapshot.val().BannerPicture == "None"){
            image.src = bannerImage;
          }
        }else{
          const image = document.createElement("img");
          image.setAttribute('id','banner');
          image.setAttribute('alt','Your banner picture');
          image.setAttribute('src',snapshot.val().BannerPicture);
          bannerPicture.appendChild(image);
          if (snapshot.val().BannerPicture == "None"){
            image.src = bannerImage;
          }
        }
      }
    })
  }
}

async function getForum(){
  const dbref = ref(db);
  const dataArea = document.getElementById("postArea");
  const user = auth.currentUser;
  get(child(dbref, "Posts"))
  .then((snapshot) => {
    if(snapshot.exists()){
      for (var key in snapshot.val()){
        if (user && dataArea){
          if (user.uid == snapshot.val()[key].Owner){
            const title = document.createElement("a");
            title.setAttribute('class','text');
            title.setAttribute('href','/forum/forumpage/'+key);
            title.innerHTML = "Post: "+snapshot.val()[key].Title;
            const post = document.createElement("dd");
            post.innerHTML = snapshot.val()[key].Body;
            post.setAttribute('class','text')
            const linebreaker = document.createElement("dt")
            linebreaker.innerHTML = "_________________________________________________________________________________________________"
            dataArea.appendChild(title);
            dataArea.appendChild(post);
            dataArea.appendChild(linebreaker);
          }
        }
      }
    }else{
      console.log("No data available");
    }
  })
}

function uploadImage(){
  console.log("Test");
  const user = auth.currentUser;
  if (user){
    const dbref = ref(db)
    console.log(user.uid);
    get(child(dbref, "Users/" + user.uid))
    .then((snapshot)=>{
      if(snapshot.exists()){
        console.log("Found Data")
        const file = document.getElementById("profileChange").files[0];
        if (file == null){
          const updates = {};
          updates["Users/"+user.uid+"/ProfilePicture"] = "None";
          update(dbref,updates);
          updateProfilePicture();
        }else{
          const name = +new Date() + "-" + user.uid + "-" + file.name;
          const storage = getStorage();
          const sref = storageref(storage, name);
          console.log(snapshot.val().ProfilePicture);
          getDownloadURL(storageref(storage,snapshot.val().ProfilePicture))
          .then((url) => {
            deleteObject(storageref(storage,snapshot.val().ProfilePicture))
            .then(() => {
              console.log("Old profile picture deleted");
            })
            .catch((error) => {
              console.log("Error occured deleting");
            });
          })
          .catch(console.error);

          const metadata = {
            contentType: file.type
          };
          const uploadTask = uploadBytes(sref, file, metadata);
          uploadTask
          .then(snapshot => getDownloadURL(snapshot.ref))
          .then(url => {
            console.log(url);
            const updates = {};
            updates["Users/"+user.uid+"/ProfilePicture"] = url;
            update(dbref,updates);
            updateProfilePicture();
          })
          .catch(console.error);
        }
      }
    })
  }
}

function uploadBanner(){
  console.log("Test2");
  const user = auth.currentUser;
  if (user){
    const dbref = ref(db)
    console.log(user.uid);
    get(child(dbref, "Users/" + user.uid))
    .then((snapshot)=>{
      if(snapshot.exists()){
        console.log("Found Data")
        const file = document.getElementById("bannerChange").files[0];
        if (file == null){
          const updates = {};
          updates["Users/"+user.uid+"/BannerPicture"] = "None";
          update(dbref,updates);
          updateBanner();
        }else{
          const name = +new Date() + "-" + user.uid + "-" + file.name;
          const storage = getStorage();
          const sref = storageref(storage, name);
          console.log(snapshot.val().BannerPicture);
          getDownloadURL(storageref(storage,snapshot.val().BannerPicture))
          .then((url) => {
            deleteObject(storageref(storage,snapshot.val().BannerPicture))
            .then(() => {
              console.log("Old banner picture deleted");
            })
            .catch((error) => {
              console.log("Error occured deleting");
            });
          })
          .catch(console.error);

          const metadata = {
            contentType: file.type
          };
          const uploadTask = uploadBytes(sref, file, metadata);
          uploadTask
          .then(snapshot => getDownloadURL(snapshot.ref))
          .then(url => {
            console.log(url);
            const updates = {};
            updates["Users/"+user.uid+"/BannerPicture"] = url;
            update(dbref,updates);
            updateBanner();
          })
          .catch(console.error);
        }
      }
    })
  }
}

function signOutOf(){
  auth.signOut();
  window.location.reload(false);
}

setTimeout(getForum, 1000);

const Profile = () => {
  return <div>
    <MainLayout><div className="page">
      <div id = "bannerPicture">
        <img id = "banner" src = {bannerImage} />
        <input id = "bannerChange" type = "file" accept = "png" onChange = {uploadBanner} title = " "/>
      </div>
      <div id = "profilePicture">
        <img id = "pfp" src = {profileImage} />
        <input id = "profileChange" type = "file" accept = "png" onChange = {uploadImage} title = " "/>
      </div>

      <div id = "uploadPhotoSpot"></div>
      <div id = "uploadBannerSpot"></div>
      <div id = "signOut"></div>
      <br /><br /><br /><br />
      <div id = "Posts">
        <dl id = "postArea" className = "text" />
      </div>
    </div></MainLayout>
  </div>
}

export default Profile;
