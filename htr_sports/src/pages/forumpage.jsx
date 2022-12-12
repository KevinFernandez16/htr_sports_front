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

function showReplies(key){
  const dbref = ref(db);
  console.log("SHOW IT FOO "+key)
  const repliesArea = document.getElementById("replies");
  get(child(dbref, '/Posts/'+key+'/Replies'))
  .then((snapshot)=>{
    if(snapshot.exists()){
      var arrayLength = snapshot.val().length;
      for (var i = 0; i < arrayLength; i++) {
        const reply_div = document.createElement("div");
        const Replier = document.createElement("a");
        const ReplyPost = document.createElement("p");

        Replier.setAttribute('href','/profile/'+snapshot.val()[i].CreatorID);

        Replier.innerHTML = snapshot.val()[i].Creator + ":";
        ReplyPost.innerHTML = snapshot.val()[i].Message;

        const Breaker = document.createElement("p");
        Breaker.innerHTML = "_______________________________________________"

        reply_div.appendChild(Replier);
        reply_div.appendChild(ReplyPost);
        reply_div.appendChild(Breaker);

        repliesArea.appendChild(reply_div);
        console.log(snapshot.val()[i]);
      }
    }
  });
}

function replyPost(key,reply){
  const dbref = ref(db);
  const user = auth.currentUser;
  if (user == null){
    return 0
  }
  console.log(user);
  var replyPos = '0';
  var numberPos = 0;
  const replyT = {};

  get(child(dbref, '/Posts/'+key))
  .then((snapshot)=>{
    if(snapshot.exists()){
      replyPos = snapshot.val().ReplyCount
      console.log(snapshot.val().ReplyCount);

      numberPos = parseInt(replyPos);
      numberPos += 1;
      console.log("Next Position: "+numberPos);

      replyT['/Posts/'+key+'/Replies/'+replyPos+"/Message"] = reply;
      replyT['/Posts/'+key+'/Replies/'+replyPos+"/CreatorID"] = user.uid;
      get(child(dbref, 'Users/'+user.uid))
      .then((snapshot)=>{
        console.log(snapshot.val().DisplayName);
        replyT['/Posts/'+key+'/Replies/'+replyPos+"/Creator"] = snapshot.val().DisplayName;
      });
      replyT['/Posts/'+key+'/ReplyCount'] = numberPos.toString();

      setTimeout(() => {update(dbref,replyT); window.location.reload(); },500);
    }
  });
}

function editPostBtn(){
  console.log('pressed');
  if (editing == false){
    editing = true
    const area = document.getElementById("editArea");

    const edit_title = document.createElement("input");
    edit_title.setAttribute('id','edit_title_'+page_id);
    edit_title.setAttribute('type','text');
    edit_title.setAttribute('class','edit_title');

    const edit_post = document.createElement("input");
    edit_post.setAttribute('id','edit_body_'+page_id);
    edit_post.setAttribute('type','text');
    edit_post.setAttribute('class','edit_box');

    const commitBtn = document.createElement("button");
    commitBtn.setAttribute('id','commitBtn');
    commitBtn.setAttribute('value','Commit');
    commitBtn.setAttribute('class','button');
    commitBtn.innerHTML = "Commit";

    area.innerHTML = area.innerHTML + "<br>Title: \t";
    area.appendChild(edit_title);
    area.innerHTML = area.innerHTML + "<br>Body: \t";
    area.appendChild(edit_post);
    area.innerHTML = area.innerHTML + "<br>";
    area.appendChild(commitBtn);
    area.innerHTML = area.innerHTML + "<br>";

    document.getElementById("commitBtn").addEventListener('click',function(){
      editPost(page_id,document.getElementById('edit_title_'+page_id).value,document.getElementById('edit_body_'+page_id).value)
    });
  }else{
    const area = document.getElementById("editArea");
    editing = false
    const element1 = document.getElementById('edit_title_'+page_id);
    element1.parentNode.removeChild(element1);
    const element2 = document.getElementById('edit_body_'+page_id);
    element2.parentNode.removeChild(element2);
    const element3 = document.getElementById('commitBtn');
    element3.parentNode.removeChild(element3);
    area.innerHTML = "";
  }
}

async function readData(){
  const dbref = ref(db);
  const user = auth.currentUser;
  var username = "";
  console.log("pageid is ",{ page_id });
  const post = document.getElementById("post");
  const editpost = document.getElementById("editPost");
  const replypost = document.getElementById("replyArea");
  get(child(dbref, "Posts/" + page_id))
  .then((snapshot) => {
    if(snapshot.exists()){
      const key = snapshot.val().Owner;
      const PostTitle = snapshot.val().Title;
      const PostBody = snapshot.val().Body;
      const PT = document.createElement("a");

      get(child(dbref, 'Users/'+key))
      .then((snapshot)=>{
        PT.innerHTML = snapshot.val().DisplayName + " Posted: " + PostTitle;
        PT.setAttribute('href','/profile/'+key);
      });

      const PB = document.createElement("p");
      PB.innerHTML = PostBody;
      post.appendChild(PT);
      post.appendChild(PB);

      const Breaker = document.createElement("p");
      Breaker.innerHTML = "_______________________________________________"

      post.appendChild(Breaker);
      if (user){
        if (user.uid == key){
          const edit_Btn = document.createElement("button");
          edit_Btn.setAttribute('id','editBtn');
          edit_Btn.setAttribute('value','Edit');
          edit_Btn.setAttribute('class','button');
          edit_Btn.innerHTML = "Edit";

          const deleteBtn = document.createElement("button");
          deleteBtn.setAttribute('id','deleteBtn');
          deleteBtn.setAttribute('value','Delete');
          deleteBtn.setAttribute('class','button');
          deleteBtn.innerHTML = "Delete";

          editpost.appendChild(edit_Btn);
          editpost.innerHTML = editpost.innerHTML + "<br><br>";
          editpost.appendChild(deleteBtn);

          document.getElementById("editBtn").addEventListener('click',function(){
            editPostBtn();
          });
          document.getElementById("deleteBtn").addEventListener('click',function(){
            deletePost(page_id);
          });
        }
      }
      if (user != null){
        const reply_post = document.createElement("input");
        reply_post.setAttribute('id','reply_body_'+page_id);
        reply_post.setAttribute('type','text');
        reply_post.setAttribute('class','reply_box');

        const reply_Btn = document.createElement("button");
        reply_Btn.setAttribute('id','replyBtn');
        reply_Btn.setAttribute('value','Reply');
        reply_Btn.setAttribute('class','button');
        reply_Btn.innerHTML = "Reply";

        replypost.appendChild(reply_post);
        replypost.appendChild(reply_Btn);

        document.getElementById("replyBtn").addEventListener('click',function(){
          replyPost(page_id,document.getElementById('reply_body_'+page_id).value);
        });
      }
      showReplies(page_id);
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

          <div id = "editArea">
          </div>

          <div id = "editPost">
          </div>

          <div id = "replyArea">
          </div>

          <div id = "replies">
            <h2>REPLIES</h2>
            <p>_______________________________________________</p>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default Forum;
