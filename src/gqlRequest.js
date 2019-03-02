/*global chrome*/
// import {auth} from "./Authentication/firebase";
// import api from "./apis/api"
import {GraphQLClient} from "graphql-request/dist/src/index";
import {graphql_server} from "./endpoints";


let user = null;
let token = null;
let graphQLClient = null

chrome.runtime.sendMessage({user: true}, async function (response) {
    user = response.user
    // console.log('idtoken', await auth.currentUser.getIdToken())
});

/*
chrome.runtime.sendMessage({idToken: true}, async function (response) {
    console.log("idtoken gql", response)
    console.log('idtoken', await auth.currentUser.getIdToken())
});
*/

const delayUser = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(user), 400)
    })
}


export default async function gqlRequest(...options) {
    if (!user) {
        user = await delayUser();
    }
    // console.log("user at gql", user, user.uid)
    //TODO ...hacky
    // const idToken = user.stsTokenManager.accessToken; //await api.getIdToken()

    const idToken = user.uid.split('').reverse().join(''); //await api.getIdToken()

    if (idToken !== token) {
        token = idToken;

        graphQLClient = new GraphQLClient(graphql_server, {
            headers: {Authorization: `Bearer ${token}`}
        })
    }
    // console.log('gql request !')
    return graphQLClient.request(...options)
}