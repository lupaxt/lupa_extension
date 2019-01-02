import {auth} from "../Authentication/firebase";
import {GraphQLClient} from "graphql-request/dist/src/index";
import {graphql_server} from "../endpoints";

export default async function gqlRequest(...options) {
    const token = await auth.currentUser.getIdToken()
    const graphQLClient = new GraphQLClient(graphql_server, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    console.log('gql request !')

    return graphQLClient.request(...options)
}