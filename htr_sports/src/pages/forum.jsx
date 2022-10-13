// const Forum = () => {
//     return <div className="page">FORUM</div>
// }

// export default Forum;

import { MainLayout } from "./mainLayout";

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
          title.innerHTML = "Post: "+snapshot.val()[key].Title;
          const post = document.createElement("dd");
          post.innerHTML = snapshot.val()[key].Body;
          const linebreaker = document.createElement("dt")
          linebreaker.innerHTML = "---------------------------------------------"
          forum.appendChild(title);
          forum.appendChild(post);
          if (user){
            if (user.uid == snapshot.val()[key].Owner){
              const edit_title = document.createElement("input");
              edit_title.setAttribute('id','edit_title_'+key);
              edit_title.setAttribute('type','text');
              console.log(edit_title.id);
              const edit_post = document.createElement("input");
              edit_post.setAttribute('id','edit_body_'+key);
              edit_post.setAttribute('type','text');
              const editBtn = document.createElement("button");
              editBtn.setAttribute('id','editBtn');
              editBtn.setAttribute('value','Edit');
              editBtn.innerHTML = "Edit";
              editBtn.addEventListener('click',function(){
                editPost(key,document.getElementById('edit_title_'+key).value,document.getElementById('edit_body_'+key).value)
              });

              const deleteBtn = document.createElement("button");
              deleteBtn.setAttribute('id','deleteBtn');
              deleteBtn.setAttribute('value','Delete');
              deleteBtn.innerHTML = "Delete";
              deleteBtn.addEventListener('click',function(){
                deletePost(key);
                //editPost(key,document.getElementById('edit_title_'+key).value,document.getElementById('edit_body_'+key).value)
              });

              forum.innerHTML = forum.innerHTML + "<br>Title: ";
              forum.appendChild(edit_title);
              forum.innerHTML = forum.innerHTML + "<br>Body: ";
              forum.appendChild(edit_post);
              forum.innerHTML = forum.innerHTML + "<br>";
              //forum.appendChild(edit);
              forum.appendChild(editBtn);
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
       Forum
    </MainLayout>
      <center><div class = "dropdown">
        <form>
          <label for = "title">Title:</label>
          <input type = "text" id = "title" name = "title"></input><br/><br/>
          <label for = "body">Body:</label>
          <input type = "text" id = "body" name = "body"></input><br/><br/>
          <input type = "button" id = "insert" value = "Submit Post" onClick = {CreatePost}></input>
          {readData}
        </form>
        </div></center>
    <dl id = "forum">
    </dl>
  </div>
}

export default Forum;
