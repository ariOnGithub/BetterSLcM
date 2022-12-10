// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2t4uOwwbUgJAlydUzlPGEZZfKQUxXTiM",
  authDomain: "betterslcm-93588.firebaseapp.com",
  projectId: "betterslcm-93588",
  storageBucket: "betterslcm-93588.appspot.com",
  messagingSenderId: "604910435411",
  appId: "1:604910435411:web:eab46a266766899e0d5aa6",
  measurementId: "G-P425LXCKE7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = getAuth();

function test(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // alert("User has signed in!!");
      window.location = "http://127.0.0.1:3000";
      // alert(uid);
      // ...
    } else {
      // User is signed out
      alert("user signed out");
      window.location = "index.html"
      // ...
    }
  });
}


function SignUp(){
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const confpass = document.getElementById("confpassword").value;
    const tnc = document.getElementById("tnc");
    const campus = document.getElementById("campus-select").value;
    const regnum = document.getElementById("regnum").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const name = fname+" "+lname;

    if((pass==confpass)&&tnc.checked){
        const auth = getAuth();
        const db = getDatabase();
    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // alert("User created successfully");
        set(ref(db, 'users/' + regnum), {
          Name: name,
          email: email,
          regnum: regnum,
          campus: campus,
          password: password
        })
      .then(() => {
        // alert("Data stored successfully!")
        test();
      })
      .catch((error) => {
        // The write failed...
        alert(error);
      });
    })
    .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
    });
    }
}

function Login(){
    const email = document.getElementById("lemail").value;
    const pass = document.getElementById("lpassword").value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
        // Signed in 
        // const user = userCredential.user;
        // ...
        test();
    })
    .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
}

function SignOut(){
//     const auth = getAuth();
//     auth.signOut()
// .then(() => {
//   alert('Signed Out');
//   test();
// })
// .catch(e=>{
//  alert('Sign Out Error', e);
// });
window.location = "index.html"
}

document.getElementById("reg").addEventListener("click", SignUp);
document.getElementById("log").addEventListener("click", Login);
document.getElementById("signout_btn").addEventListener("click", SignOut);