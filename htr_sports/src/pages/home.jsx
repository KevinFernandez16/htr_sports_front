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

function createAccount(){
  //alert("Clicked");
  //const dbref = ref(db)
  console.log(email);
  console.log(password);
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log("Just made an account!");

    var NewData = defaultData
    NewData.Email = email;
    NewData.Password = password;
    set(ref(db, 'Users/'+user.uid),/*{
      DisplayName: "Anonymous",
      Email: email,
      Password: password,
      ProfilePicture: "None",
      //Email: user.value,
    }*/defaultData)
    .then(()=>{
      console.log("Data created")
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
            image.parentNode.removeChild(image)
          }
        }else{
          const image = document.createElement("img");
          image.setAttribute('id','pfp');
          image.setAttribute('alt','Your profile picture');
          image.setAttribute('src',snapshot.val().ProfilePicture);
          profilePicture.appendChild(image);
          if (snapshot.val().ProfilePicture == "None"){
            image.parentNode.removeChild(image)
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
            image.parentNode.removeChild(image)
          }
        }else{
          const image = document.createElement("img");
          image.setAttribute('id','banner');
          image.setAttribute('alt','Your banner picture');
          image.setAttribute('src',snapshot.val().BannerPicture);
          bannerPicture.appendChild(image);
          if (snapshot.val().BannerPicture == "None"){
            image.parentNode.removeChild(image)
          }
        }
      }
    })
  }
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
        const file = document.getElementById("photo").files[0];
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
        const file = document.getElementById("bannerphoto").files[0];
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

function emailChange(value){
    //console.log(value);
    email = value;
    //console.log(email);
}

function passChange(value){
  //console.log(value)
  password = value;
  //console.log(password);
}

function signOutOf(){
  auth.signOut();
  window.location.reload(false);
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    const signIn = document.getElementById("signIn")
    const profilePicture = document.getElementById("profilePicture")
    const bannerPicture = document.getElementById("bannerPicture")
    const uploadPhotoSpot = document.getElementById("uploadPhotoSpot")
    const uploadBannerSpot = document.getElementById("uploadBannerSpot")
    const signOut = document.getElementById("signOut")
    const uid = user.uid;
    console.log("Signed in!!");
    signIn.parentNode.removeChild(signIn)

    const image_input = document.createElement("input");
    image_input.setAttribute('type','file');
    image_input.setAttribute('id','photo');
    image_input.setAttribute("accept","png")
    image_input.innerHTML = "Upload Image";
    const image_submit = document.createElement("button");
    image_submit.innerHTML = "Submit Profile Picture";
    image_submit.onclick = uploadImage;
    uploadPhotoSpot.appendChild(image_input);
    uploadPhotoSpot.appendChild(image_submit);
    updateProfilePicture();

    const image_input2 = document.createElement("input");
    image_input2.setAttribute('type','file');
    image_input2.setAttribute('id','bannerphoto');
    image_input2.setAttribute("accept","png")
    image_input2.innerHTML = "Upload Image";
    const image_submit2 = document.createElement("button");
    image_submit2.innerHTML = "Submit Banner Picture";
    image_submit2.onclick = uploadBanner;
    uploadBannerSpot.appendChild(image_input2);
    uploadBannerSpot.appendChild(image_submit2);
    updateBanner();

    const signoutBtn = document.createElement("button");
    signoutBtn.setAttribute('id','signoutbutton');
    signoutBtn.setAttribute('value','Sign Out');
    signoutBtn.innerHTML = "Sign Out";
    signoutBtn.addEventListener('click',signOutOf)
    signOut.appendChild(signoutBtn);
  } else {
    console.log("Signed out!");
  }
});

const Home = () => {
  return <div>
    <MainLayout><div className="page">
    <Carousel/>

    </div></MainLayout>

    <div id = "bannerPicture"></div>
    <div id = "profilePicture"></div>
    <div id = "uploadPhotoSpot"></div>
    <div id = "uploadBannerSpot"></div>
    <div id = "signOut"></div>
     <div className = "dropdown" id = "signIn">
      <button className = "dropbtn">Create Account</button>
      <div className = "dropdown-content">
         <form autoComplete="off"><label>Email:</label>
          <input type = "text" id = "email" name = "email" onChange = {e => emailChange(e.target.value)}></input><br/><br/>
          <label htmlFor = "password">Password:</label>
          <input type = "password" id = "password" name = "password" onChange = {e => passChange(e.target.value)}></input><br/><br/>
          <input type = "button" id = "insert" value = "Enter" onClick = {createAccount}></input>
         </form>
      </div>
     </div>
  </div>
}

export default Home;
