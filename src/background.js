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

//check if page is here
function checkIfThere(tabId) {
    chrome.tabs.sendMessage(tabId, {ping: true}, function (response) {
        if (response && response.pong) { // Content script ready
            //chrome.tabs.sendMessage(tabId, message, callback);
            return true;
        }
    })
}

// Background
function ensureSendMessage(tabId, message, callback) {
    chrome.tabs.sendMessage(tabId, {ping: true}, function (response) {
        if (response && response.pong) { // Content script ready
            chrome.tabs.sendMessage(tabId, message, callback);
        } else { // No listener on the other end
            chrome.tabs.executeScript(tabId, {file: "content.js"}, function () {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                    throw Error("Unable to inject script into tab " + tabId);
                }
                // OK, now it's injected and ready
                chrome.tabs.sendMessage(tabId, message, callback);
            });
        }
    });
}

chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    ensureSendMessage(tabs[0].id, {greeting: "hello"});
});

console.log('background HERE')


chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box"}, function (response) {
        console.log('tabs', response)
    });
});

// chrome.extension.sendMessage({action:'open_dialog_box'}, function(res){
//     console.log('ext', res)
// });
//
// chrome.runtime.sendMessage({action:'yolll'}, function(res){
//     console.log('ext', res)
// });

chrome.tabs.query({}, function (tabs) {
    var message = {"foo": "bar"};
    for (var i = 0; i < tabs.length; ++i) {
        chrome.tabs.sendMessage(tabs[i].id, message);
    }
});


// chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
//     tabs.forEach(tab => {
//         chrome.tabs.sendMessage(tab.id, {"back": "yolo"});
//     })
// })