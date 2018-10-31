import "./content.css";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Rater from './components/Rater'
/*global chrome*/

console.log('HHHEEEYoooo')


let userUID = null;
const newDiv = document.createElement("div");
newDiv.setAttribute("id", "markusExtend");
// newDiv.setAttribute("class", "wiz special swag");
document.body.appendChild(newDiv);
ReactDOM.render(<Rater uid={userUID}/>, newDiv);

chrome.runtime.onMessage.addListener(msgObj => {
    console.log("message at content script recevied", msgObj)
    userUID = msgObj.uid;
    ReactDOM.render(<Rater uid={userUID}/>, newDiv);
    // do something with msgObj
});


// injectApp()

function injectApp() {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "markusExtend");
// newDiv.setAttribute("class", "wiz special swag");
    document.body.appendChild(newDiv);
    ReactDOM.render(<Rater uid={userUID}/>, newDiv);
}

