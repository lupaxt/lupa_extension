import "./content.css";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
const container = document.getElementById('root');
console.log(container, 'root');

class Popper extends Component {
    render() {
        return (
            <div>
                <pre>HELLO </pre>
            </div>
        );
    }
}

export {Popper}

console.log('HHHEEEYoooo')

injectApp()

function injectApp() {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "markusExtend");
    // newDiv.setAttribute("class", "wiz special swag");
    document.body.appendChild(newDiv);
    ReactDOM.render(<Popper/>, newDiv);
}

