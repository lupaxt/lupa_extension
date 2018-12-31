import axios from 'axios'
import {auth} from './Authentication/firebase'


const root = "https://wizdomx.herokuapp.com/";
let idToken = "notoken";

const api = {
    fiba: {
        signOut: () => auth.signOut(),
        loginUser: ({userEmail, password}) => auth.signInWithEmailAndPassword(userEmail, password)
            .catch(error => console.log("Error FROM login", error)),


        createUser: ({userEmail, password}) => auth.createUserWithEmailAndPassword(userEmail, password)
            .then(authUser => {
                console.log('auth user', authUser)
                const firebaseUID = authUser.uid;
                // return saveUserBackend({userEmail, firebaseUID})
                //     .catch(err => "User was created in Firebase but not in our backend")
            })
            .catch(err => console.log(err, " from update profile")),
    },
    set: {
        saveUserBackend: ({userEmail, firebaseUID, handle}) => post(root + 'create/user', {userEmail, firebaseUID, handle}),
        docInfo: (url, titleOnly = true) => post(root + 'parse/alt', {url, titleOnly}),
        handle: ({handle, firebaseUID = auth.currentUser.uid}) => post(root + 'create/handle', {handle, firebaseUID}),
        review: (review = reviewEx) => post(root + 'reviews/save/', review),
        review_axios: (review = reviewEx) => axios.post(root + 'reviews/save/', review),
    },
    get: {
        handle: (handle) => get(`${root}handle/${handle}`),
        allReviews: (groups = []) => get(root + 'reviews/all'),
        reviewsWithKeyValuePair:(kvp) => post(root + 'reviews/kvp', kvp),
        joinGroup: ({groupID, firebaseUID = auth.currentUser.uid}) => post(root + 'groups/join', {
            firebaseUID,
            groupID
        }),

        user: (firebaseUID) => get(root + 'user/' + firebaseUID),
        reviewsForGroup: (groupID) => get(root + 'groups/:groupId/reviews')
    }
}

// getDoc("https://medium.com/@ageitgey/machine-learning-is-fun-80ea3ec3c471").then(result => console.log('getDoc', result))
const reviewEx = {
    url: "www.comwww.com/whyT",
    firebaseUID: "wwww",
    handle: "greatPerson",
    title: "How YOU is 8",
    comment: "FFSS",
    emoji: "0x1F596"
    // rating: 3
}

function verify() {
    auth.currentUser.getIdToken()
        .then(res => console.log('verify', res))
        .catch(err => {
            throw err
        })
}

const get = function (url) {
    return fetch(url, {method: 'GET'})
        .then(function (response) {
            return response.json();
        })
        .catch(function (err) {
            console.debug(`
            Content Fetch NO SUCCESS
            URL = ${url}
            ERROR = ${err}
            `)
        })
};

const post = function (url, data = {}, idToken = idToken) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `${idToken}`,
        })
    })
        .then(function (response) {
            console.log("post response text ", response, " url", url)
            return response.json()
        })
        .catch(function (err) {
            console.debug(`
            Content Fetch NO SUCCESS
            URL = ${url}
            ERROR = ${err}
            `)
            throw err
        })
};



//make standardWrapper Promise for catch and then


//register User ==> save in storage
//logIn User ==> save in storage (firebase does?)


export default api