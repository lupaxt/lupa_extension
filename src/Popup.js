import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Authentication from './Authentication/Authentication'



//TODO display Section reader groups joined
//TODO --> onclick see members or 'expand'
//TODO display Sectionexplore reader groups
//TODO beta testing group
//

class Popup extends Component {
  render() {
    return (
      <section>


          <Authentication/>

      </section>
    );
  }
}

export default Popup;
