import "./content.css";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Rater from './components/Rater'

console.log('HHHEEEYoooo')

injectApp()

function injectApp() {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "markusExtend");
    // newDiv.setAttribute("class", "wiz special swag");
    document.body.appendChild(newDiv);
    ReactDOM.render(<Rater/>, newDiv);
}

