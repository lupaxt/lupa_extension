import React, { Component } from 'react';
import './App.css';

import Authentication from './Authentication/Authentication'



//TODO display Section reader groups joined
//TODO --> onclick see members or 'expand'
//TODO display Sectionexplore reader groups
//TODO beta testing group


function doPost(){
    return fetch("https://wizdomx.herokuapp.com/save/fromChrome", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, cors, *same-origin
    })
}

class Popup extends Component {
  render() {
    return (
      <section>
          <button onClick={() => doPost()}>HEROK</button>

          <Authentication/>

      </section>
    );
  }
}

export default Popup;
