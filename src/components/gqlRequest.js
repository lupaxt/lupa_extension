import {auth} from "../Authentication/firebase";
import {GraphQLClient} from "graphql-request/dist/src/index";
import {graphql_server} from "../endpoints";


let token = null;
let graphQLClient = null
export default async function gqlRequest(...options) {
    const idToken = await auth.currentUser.getIdToken()
    if (idToken !== token) {
        token = idToken;
        
        graphQLClient = new GraphQLClient(graphql_server, {
            headers: {Authorization: `Bearer ${token}`}})
    }
    // console.log('gql request !')
    return graphQLClient.request(...options)
}