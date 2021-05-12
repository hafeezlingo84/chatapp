
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyCFhWieqd8QV6_XGO28LL78DBdMxafPPMA",
    authDomain: "test-app-50e11.firebaseapp.com",
    databaseURL: "https://test-app-50e11-default-rtdb.firebaseio.com",
    projectId: "test-app-50e11",
    storageBucket: "test-app-50e11.appspot.com",
    messagingSenderId: "547267323350",
    appId: "1:547267323350:web:ae7061da3fa472d16f7077",
    measurementId: "G-5VEN5ZMHSM"
  };
  // Initialize Firebase
  
  var Firebase = firebase.initializeApp(firebaseConfig);
  
  export default Firebase;