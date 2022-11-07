// const Forum = () => {
//     return <div className="page">FORUM</div>
// }

// export default Forum;

import { MainLayout } from "./mainLayout";
import "./Forum.css";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();

const auth = getAuth(app)

function CreatePost(){
  //alert("Clicked");
  const user = auth.currentUser;
  if (user){
    var title = document.getElementById("title");
    var body = document.getElementById("body");
    var forum = document.getElementById("forum");

    push(ref(db, '/Posts'),{
       Title: title.value,
       Body: body.value,
       Owner: user.uid,
   })
   .then(()=>{
       alert("Posted successfully");
       //location.reload();
   })
   .catch((error)=>{
       alert(error);
   });
  }
}

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
    var title = document.getElementById("title");
    var body = document.getElementById("body");
    var forum = document.getElementById("forum");
    const user = auth.currentUser;
    const dbRef = ref(db);
    get(child(dbRef, `Posts/`)).then((snapshot) => {
    if (snapshot.exists()) {
        //console.log(snapshot.val());
        for (var key in snapshot.val()){
          console.log(snapshot.val()[key]);
          const title = document.createElement("dt");
          title.setAttribute('class','text')
          title.innerHTML = "Post: "+snapshot.val()[key].Title;
          const post = document.createElement("dd");
          post.innerHTML = snapshot.val()[key].Body;
          post.setAttribute('class','text')
          const linebreaker = document.createElement("dt")
          linebreaker.innerHTML = "_________________________________________________________________________________________________"
          forum.appendChild(title);
          forum.appendChild(post);
          if (user){
            if (user.uid == snapshot.val()[key].Owner){
              const edit_title = document.createElement("input");
              edit_title.setAttribute('id','edit_title_'+key);
              edit_title.setAttribute('type','text');
              edit_title.setAttribute('class','edit_title');
              console.log(edit_title.id);
              const edit_post = document.createElement("input");
              edit_post.setAttribute('id','edit_body_'+key);
              edit_post.setAttribute('type','text');
              edit_post.setAttribute('class','edit_box');
              const editBtn = document.createElement("button");
              editBtn.setAttribute('id','editBtn');
              editBtn.setAttribute('value','Edit');
              editBtn.setAttribute('class','button');
              editBtn.innerHTML = "Edit";
              editBtn.addEventListener('click',function(){
                editPost(key,document.getElementById('edit_title_'+key).value,document.getElementById('edit_body_'+key).value)
              });

              const deleteBtn = document.createElement("button");
              deleteBtn.setAttribute('id','deleteBtn');
              deleteBtn.setAttribute('value','Delete');
              deleteBtn.setAttribute('class','button');
              deleteBtn.innerHTML = "Delete";
              deleteBtn.addEventListener('click',function(){
                deletePost(key);
                //editPost(key,document.getElementById('edit_title_'+key).value,document.getElementById('edit_body_'+key).value)
              });

              forum.innerHTML = forum.innerHTML + "<br>Title: \t";
              forum.appendChild(edit_title);
              forum.innerHTML = forum.innerHTML + "<br>Body: \t";
              forum.appendChild(edit_post);
              forum.innerHTML = forum.innerHTML + "<br>";
              //forum.appendChild(edit);
              forum.appendChild(editBtn);
                forum.innerHTML = forum.innerHTML + "<br><br>";
              forum.appendChild(deleteBtn);
            }
          }
          forum.appendChild(linebreaker);
        }
    } else {
    console.log("No data available");
}
    }).catch((error) => {
    console.error(error);
    });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Signed in!!");
  } else {
    console.log("Signed out!");
  }
});

setTimeout(readData, 1000);

const Forum = () => {
    return <div className="page">
    <MainLayout>
        <center><div class = "dropdown">
          <form>
            <label for = "title" className="text">Title:</label>
            <input type = "text" id = "title" name = "title"></input><br/><br/>
            <label for = "body" className="text">Body:</label>
            <input type = "text" id = "body" name = "body"></input><br/><br/>
            <input type = "button" id = "insert" value = "Submit Post" onClick = {CreatePost} className="button"></input>
            {readData}
          </form>
          </div></center>
      <dl id = "forum" className = "text">
      </dl>
    </MainLayout>

  </div>
}

export default Forum;
