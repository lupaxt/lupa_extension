/*global chrome*/
import {auth} from './Authentication/firebase';

let myUser;
auth.onAuthStateChanged(async function (user) {
    if (user) {
        console.log("USER Logged IN", user)
        myUser = user
    }
    else {
        myUser = null
    }
})
chrome.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.user)
            sendResponse({user: myUser});
        if (request.uid) {
            sendResponse({uid: auth.currentUser.uid})
        }
        /*if (request.idToken) {
            try {
                const token = await auth.getIdToken();
                console.log(token, "token")
                sendResponse({idToken: token})
            }catch(error) {
                console.log("err at getting idtoken", error)
            }

        }*/
    });
