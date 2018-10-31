/*global chrome*/
import "./content.css";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Rater from './components/Rater'

console.log('Hi! Lupa here')

let uid = null;

//inject in DOM
const newDiv = document.createElement("div");
newDiv.setAttribute("id", "markusExtend");
document.body.appendChild(newDiv);
ReactDOM.render(<Rater uid={uid}/>, newDiv);

chrome.runtime.sendMessage({user: true}, function(response) {
    console.log(response.user ? 'user exists' : "no logged in user found");
    if (response.user) {
        uid = response.user.uid;
        ReactDOM.render(<Rater uid={uid}/>, newDiv);
    }
});

