/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './Popup';
import {auth} from "./Authentication/firebase";
import Rater from './components/Rater'
// import registerServiceWorker from './registerServiceWorker';

//CSS STYLESHEETS
import "simple-line-icons/css/simple-line-icons.css"
// import "./assets/fontAwesome/css/all.min.css"
import "./styles/coreui/coreui.css"
// import "@coreui/icons/css/coreui-icons.css"
import './styles/index.css';
import {getUser} from "./apis/query";

chrome.runtime.sendMessage("nalofdpcjiipfedhjhkmdpnjflgpbmil",{user: true}, async function(response) {
    // console.log(response.user.uid);
    // const user = response.user.uid;
    // const lupa_user = await getUser(user)
    ReactDOM.render(<Rater uid={"asdsds"} /*user={lupa_user}*//>, document.getElementById('root'));
});

//for registering / logout transission
auth.onAuthStateChanged(async (user) =>  {
    const lupa_user = await getUser(user.uid);
    ReactDOM.render(<Rater uid={"asdsds"} user={user} lupa_user={lupa_user.user}/>, document.getElementById('root'))
})

ReactDOM.render(<Rater uid={"asdsds"} user={null}/>, document.getElementById('root'));
// ReactDOM.render(<Popup user={null}/>, document.getElementById('root'));
//blocks request sheme
//registerServiceWorker();
