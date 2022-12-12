// const Forum = () => {
//     return <div className="page">FORUM</div>
// }

// export default Forum;

import { MainLayout } from "./mainLayout";
import "./Forum.css";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import { getDatabase, set, get, update, remove, ref, child, push, onValue, query } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getStorage, ref as storageref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-storage.js";

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

function CreatePost() {
  //alert("Clicked");
  const user = auth.currentUser;
  if (user) {
    var title = document.getElementById("title");
    var body = document.getElementById("body");
    var forum = document.getElementById("forum");

    push(ref(db, '/Posts'), {
      Title: title.value,
      Body: body.value,
      Owner: user.uid,
      ReplyCount: 0,
    })
      .then(() => {
        alert("Posted successfully");
        //location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  }
}

function editPost(key, title, body) {
  console.log(key);
  console.log(title);
  if (title == "" || body == "") {
    alert("Both text cannot be empty!");
    return 0
  }
  var user = document.getElementById("username");
  var forum = document.getElementById("forum");

  const updates = {};
  updates['/Posts/' + key + '/Title'] = title;
  updates['/Posts/' + key + '/Body'] = body;
  update(ref(db), updates)
    .then(() => {
      alert("Edited successfully");
      //location.reload();
    })
    .catch((error) => {
      alert(error);
    });
}

function deletePost(key) {
  const dbref = ref(db, '/Posts/' + key);
  remove(dbref)
    .then(() => {
      alert("Deleted!");
      //location.reload();
    })
    .catch((error) => {
      alert(error);
    });
}

async function readData(){
    var title = document.getElementById("title");
    var body = document.getElementById("body");
    var forum = document.getElementById("forum");
    if (forum != null){
      const user = auth.currentUser;
      const dbRef = ref(db);
      get(child(dbRef, `Posts/`)).then((snapshot) => {
        if (snapshot.exists()) {
          //console.log(snapshot.val());
          for (var key in snapshot.val()){
            console.log(snapshot.val()[key]);
            const title = document.createElement("a");
            title.setAttribute('class','text');
            title.setAttribute('href','/forum/forumpage/'+key);
            console.log('/forum/forumpage/'+key)
            title.innerHTML = "Post: "+snapshot.val()[key].Title;
            const post = document.createElement("dd");
            post.innerHTML = snapshot.val()[key].Body;
            post.setAttribute('class','text')
            const linebreaker = document.createElement("dt")
            linebreaker.innerHTML = "_________________________________________________________________________________________________"
            forum.appendChild(title);
            forum.appendChild(post);
            forum.appendChild(linebreaker);
          }
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
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
      <h1 className="page_title">HTR Sports Forums</h1>
      <div className="create-post">
        <form>

          <div className = "post-title-div">

            <label for="title" className="text-label"> </label><br></br>
            <input type="text" id="title" name="title" placeholder="Post Title"></input>

          </div>

          <div className="post-body-div">
            <label for="body" className="text"></label><br></br>
            <textarea id="body" name="body" rows="5" cols="50">Post body...</textarea> <br></br>

          </div>

          {/* <input type = "text" id = "body" name = "body"></input><br/><br/> */}
          <input type="button" id="insert" value="Submit Post" onClick={CreatePost} className="button"></input>
          {readData}
        </form>




      </div>
      <div className="all-posts"><dl id="forum" className="curr-posts"></dl></div>




    </MainLayout>

  </div>
}

export default Forum;
