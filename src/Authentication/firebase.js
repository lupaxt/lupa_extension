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

firebase.initializeApp(config);

const isFirebaseSetup = function() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
            'Make sure you go through the codelab setup instructions and make ' +
            'sure you are running the codelab using `firebase serve`');
    }
    return false;
}

// Create a callback which logs the current auth state
function authDataCallback(authData) {
    if (authData) {
        console.log("User " + authData['uid'] + " is logged with token" + authData['ie']);
    } else {
        console.log("User is logged out");
    }
}
// Register the callback to be fired every time auth state changes
// isFirebaseSetup(); buggy

const auth = firebase.auth();

// auth.onAuthStateChanged(user => console.log("user in firebase.js", user, "getidtoken", user.getIdToken))

window.auth_ext = auth;

export {
  auth
};

