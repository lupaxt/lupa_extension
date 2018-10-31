/*global chrome*/
import "./content.css";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Rater from './components/Rater'

console.log('HHHEEEYoooo')

// Content script
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if(request.ping) { sendResponse({pong: true}); return; }
//     /* Content script action */
// });

let uid = null;

//inject in DOM
const newDiv = document.createElement("div");
newDiv.setAttribute("id", "markusExtend");
// newDiv.setAttribute("class", "wiz special swag");
document.body.appendChild(newDiv);
ReactDOM.render(<Rater uid={uid}/>, newDiv);

chrome.runtime.sendMessage({user: true}, function(response) {
    console.log(response.user);
    uid = response.user.uid;
    ReactDOM.render(<Rater uid={uid}/>, newDiv);
});

