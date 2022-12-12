import React from "react";
import { useParams } from "react-router-dom";
import "../pages/css/profile.css"
import profileImage from "../pages/images/dummyimage.jpg"
import bannerImage from "../pages/images/dummybanner.png"
import { MainLayout } from "./mainLayout";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import { getDatabase, set, get, update, remove, ref, child } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getStorage, ref as storageref, uploadBytes, getDownloadURL, deleteObject }  from "https://www.gstatic.com/firebasejs/9.9.4/firebase-storage.js";

var page_id;

// Initialize Firebase
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
  const dbref = ref(db)

  const profileChange = document.getElementById("profileChange")
  const user = auth.currentUser;

  if (!profileChange && user){
    if(user.uid == page_id){
      const pfpchange = document.createElement("input");
      pfpchange.setAttribute('id','profileChange');
      pfpchange.setAttribute('type','file');
      pfpchange.setAttribute('accept','png');
      pfpchange.setAttribute('title',' ');
      pfpchange.addEventListener('change',uploadImage);
      profilePicture.appendChild(pfpchange);
    }
  }

  get(child(dbref, "Users/" + page_id))
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

function updateBanner(){
  const bannerPicture = document.getElementById("bannerPicture")
  const dbref = ref(db)

  const bannerChange = document.getElementById("bannerChange")
  const user = auth.currentUser;

  if (!bannerChange && user){
    if(user.uid == page_id){
      const bchange = document.createElement("input");
      bchange.setAttribute('id','bannerChange');
      bchange.setAttribute('type','file');
      bchange.setAttribute('accept','png');
      bchange.setAttribute('title',' ');
      bchange.addEventListener('change',uploadBanner);
      bannerPicture.appendChild(bchange);
    }
  }

  get(child(dbref, "Users/" + page_id))
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

function setName(){
  const username = document.getElementById("username")
  const dbref = ref(db)

  get(child(dbref, "Users/" + page_id))
  .then((snapshot) => {
    if(snapshot.exists()){
      username.innerHTML = snapshot.val().DisplayName;
    }
  })
}

async function getForum(){
  const dbref = ref(db);
  const dataArea = document.getElementById("postArea");

  get(child(dbref, "Posts"))
  .then((snapshot) => {
    if(snapshot.exists()){
      for (var key in snapshot.val()){
        if (dataArea){
          if (page_id == snapshot.val()[key].Owner){
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
  const dbref = ref(db)
  console.log(page_id);
  get(child(dbref, "Users/" + page_id))
  .then((snapshot)=>{
    if(snapshot.exists()){
      console.log("Found Data")
      const file = document.getElementById("profileChange").files[0];
      if (file == null){
        const updates = {};
        updates["Users/"+page_id+"/ProfilePicture"] = "None";
        update(dbref,updates);
        updateProfilePicture();
      }else{
        const name = +new Date() + "-" + page_id + "-" + file.name;
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
          updates["Users/"+page_id+"/ProfilePicture"] = url;
          update(dbref,updates);
          updateProfilePicture();
        })
        .catch(console.error);
      }
    }
  })
}

function uploadBanner(){
  const dbref = ref(db)
  console.log(page_id);
  get(child(dbref, "Users/" + page_id))
  .then((snapshot)=>{
    if(snapshot.exists()){
      console.log("Found Data")
      const file = document.getElementById("bannerChange").files[0];
      if (file == null){
        const updates = {};
        updates["Users/"+page_id+"/BannerPicture"] = "None";
        update(dbref,updates);
        updateBanner();
      }else{
        const name = +new Date() + "-" + page_id + "-" + file.name;
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
          updates["Users/"+page_id+"/BannerPicture"] = url;
          update(dbref,updates);
          updateBanner();
        })
        .catch(console.error);
      }
    }
  })
}

setTimeout(getForum, 1000);
setTimeout(updateProfilePicture, 200);
setTimeout(updateBanner, 200);
setTimeout(setName, 200);

const Profile = () => {
  let { id } = useParams();
  page_id = id;
  console.log("id is ",page_id);
  return <div>
    <MainLayout><div className="page">
      <div id = "bannerPicture">
        <img id = "banner" src = {bannerImage} />
      </div>
      <div id = "profilePicture">
        <img id = "pfp" src = {profileImage} />
      </div>

      <div id = "uploadPhotoSpot"></div>
      <div id = "uploadBannerSpot"></div>
      <div id = "signOut"></div>
      <br /><br /><br /><br />
      <h1 id = "username"></h1>
      <br /><br />
      <label >Posted Forums:</label>
      <br /><br />
      <div id = "Posts">
        <dl id = "postArea" className = "text" />
      </div>
    </div></MainLayout>
  </div>
}

export default Profile;
