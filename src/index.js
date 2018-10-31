/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './Popup';
// import registerServiceWorker from './registerServiceWorker';

//CSS STYLESHEETS
import "simple-line-icons/css/simple-line-icons.css"
// import "./assets/fontAwesome/css/all.min.css"
import "./styles/coreui/coreui.css"
// import "@coreui/icons/css/coreui-icons.css"
import './styles/index.css';

chrome.runtime.sendMessage({user: true}, function(response) {
    console.log(response.user.uid);
    const user = response.user.uid;
    ReactDOM.render(<Popup user={user}/>, document.getElementById('root'));
});

ReactDOM.render(<Popup user={null}/>, document.getElementById('root'));
//blocks request sheme
//registerServiceWorker();
