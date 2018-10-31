/*global chrome*/
import {auth} from './Authentication/firebase';

let myUser;
auth.onAuthStateChanged(function (user) {
    if (user) {
        console.log("USER Logged IN", user)
        myUser = user
    }
    else {
        myUser = null
    }
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.user)
            sendResponse({user: myUser});
    });