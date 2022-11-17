import { MainLayout } from "./mainLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Forum.css";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import {getDatabase, set, get, update, remove, ref, child, push, onValue, query} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getStorage, ref as storageref, uploadBytes, getDownloadURL, deleteObject }  from "https://www.gstatic.com/firebasejs/9.9.4/firebase-storage.js";
var page_id;

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
var editing = false

function editPost(key,title,body){
    console.log(key);
    console.log(title);
    if (title == "" || body == ""){
      alert("Both text cannot be empty!");
      return 0
    }
    var user = document.getElementById("username");
    var forum = document.getElementById("forum");

   const updates = {};
   updates['/Posts/'+key+'/Title'] = title;
   updates['/Posts/'+key+'/Body'] = body;
   update(ref(db),updates)
   .then(()=>{
       alert("Edited successfully");
       //location.reload();
   })
   .catch((error)=>{
       alert(error);
   });
}

function deletePost(key){
  const dbref = ref(db,'/Posts/'+key);
  remove(dbref)
  .then(()=>{
      alert("Deleted!");
      //location.reload();
  })
  .catch((error)=>{
      alert(error);
  });
}

async function readData(){
  const user = auth.currentUser;
  console.log("pageid is ",{ page_id });
  const post = document.getElementById("post");
  const dbref = ref(db);
  get(child(dbref, "Posts/" + page_id))
  .then((snapshot) => {
    if(snapshot.exists()){
      const key = snapshot.val().Owner;
      const PostTitle = snapshot.val().Title;
      console.log(snapshot.val().Title);
      const PostBody = snapshot.val().Body;
      const PT = document.createElement("h3");
      PT.innerHTML = PostTitle;
      const PB = document.createElement("p");
      PB.innerHTML = PostBody;
      post.appendChild(PT);
      post.appendChild(PB);
      if (user){
        if (user.uid == key){
          const edit_title = document.createElement("input");
          edit_title.setAttribute('id','edit_title_'+page_id);
          edit_title.setAttribute('type','text');
          edit_title.setAttribute('class','edit_title');
          console.log(edit_title.id);
          const edit_post = document.createElement("input");
          edit_post.setAttribute('id','edit_body_'+page_id);
          edit_post.setAttribute('type','text');
          edit_post.setAttribute('class','edit_box');
          const editBtn = document.createElement("button");
          editBtn.setAttribute('id','editBtn');
          editBtn.setAttribute('value','Edit');
          editBtn.setAttribute('class','button');
          editBtn.innerHTML = "Edit";
          editBtn.addEventListener('click',function(){
            editPost(page_id,document.getElementById('edit_title_'+page_id).value,document.getElementById('edit_body_'+page_id).value)
          });

          const deleteBtn = document.createElement("button");
          deleteBtn.setAttribute('id','deleteBtn');
          deleteBtn.setAttribute('value','Delete');
          deleteBtn.setAttribute('class','button');
          deleteBtn.innerHTML = "Delete";
          deleteBtn.addEventListener('click',function(){
            deletePost(page_id);
          });

          post.innerHTML = post.innerHTML + "<br>Title: \t";
          post.appendChild(edit_title);
          post.innerHTML = post.innerHTML + "<br>Body: \t";
          post.appendChild(edit_post);
          post.innerHTML = post.innerHTML + "<br>";
          //forum.appendChild(edit);
          post.appendChild(editBtn);
          post.innerHTML = post.innerHTML + "<br><br>";
          post.appendChild(deleteBtn);
        }
      }
    }
  })
}

setTimeout(readData, 1000);

const Forum = () => {
  let { id } = useParams();
  console.log("id is ",{ id });
  page_id = id;
  return (
    <div className="page">
      <MainLayout>
        <div>
          <div id = "post">
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Forum;
