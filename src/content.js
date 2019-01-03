/*global chrome*/
import "./content.css";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Rater from './components/Rater'
import {getUser} from "./apis/query";

let uid = null;
const newDiv = document.createElement("div");
window.onload = function () {
    newDiv.setAttribute("id", "markusExtend");
    document.body.appendChild(newDiv);
    ReactDOM.render(<Rater uid={uid}/>, newDiv);
}
//inject in DOM

chrome.runtime.sendMessage({user: true}, async function(response) {
    // console.log(response.user ? 'user exists' : "no logged in user found");
    if (response) {
        if (response.user) {
            uid = response.user.uid;
            const lupa_user = await getUser(uid)
            ReactDOM.render(<Rater uid={uid} user={lupa_user}/>, newDiv);
        }
    }

});

