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

const isFirebaseSetup = function() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    }
    return false;
}

const auth = firebase.auth();

//window.auth = auth;

export {
  auth
};

