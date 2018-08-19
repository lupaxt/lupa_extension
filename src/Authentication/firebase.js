import firebase from 'firebase/app';
import 'firebase/auth'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC9CAxlZsQ7jzHBl5YkbUHY0zGxCwhq-cc",
    authDomain: "wisdom-c02f4.firebaseapp.com",
    databaseURL: "https://wisdom-c02f4.firebaseio.com",
    projectId: "wisdom-c02f4",
    storageBucket: "wisdom-c02f4.appspot.com",
    messagingSenderId: "1078468381731"
};

if (!firebase.apps.length) {
    console.log(firebase, "firebase initialized")
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};

