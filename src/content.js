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

    chrome.runtime.sendMessage({user: true, uid: true}, async function(response) {
        if (response) {
            if (response.user) {
                uid = response.user.uid;
                ReactDOM.render(<Rater uid={uid}/>, newDiv);
            }
            else if (response.uid) {
                uid = response.uid
                ReactDOM.render(<Rater uid={response.uid}/>, newDiv);
            }
            else {
                ReactDOM.render(<Rater uid={uid}/>, newDiv);
            }
        }
    });

}
//inject in DOM

chrome.runtime.sendMessage({user: true}, async function(response) {
    // console.log("response ", response);
    if (response) {
        if (response.user) {
            uid = response.user.uid;
            ReactDOM.render(<Rater uid={uid}/>, newDiv);
        }
    }
});

