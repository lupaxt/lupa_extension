import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './Popup';
import Rater from './components/Rater';
import registerServiceWorker from './registerServiceWorker';
import {auth} from './Authentication/firebase';

/*global chrome*/

//CSS STYLESHEETS
import "simple-line-icons/css/simple-line-icons.css"
// import "./assets/fontAwesome/css/all.min.css"
import "./styles/coreui/coreui.css"
// import "@coreui/icons/css/coreui-icons.css"
import './styles/index.css';

let myUser = null

auth.onAuthStateChanged(function (user) {
    if (user) {
        console.log("USER Logged IN", user)
        myUser = user

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, {"uid": user.uid});
            })
        })

        ReactDOM.render(<Popup user={myUser}/>, document.getElementById('root'));

        /*api.getUser().then(user => {
            myUser = user
        })*/
    }
    else {
        myUser = null
    }


});

// chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {type: "getText"}, function (response) {
//         alert(response)
//         console.log("text", response)
//         // $("#text").text(response);
//     });

ReactDOM.render(<Popup user={myUser}/>, document.getElementById('root'));
registerServiceWorker();
