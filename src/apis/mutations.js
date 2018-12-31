// import {gql} from "apollo-boost";
import gql from 'graphql-tag';

import gqlRequest from "../components/gqlRequest";
//createReview is just the operationname you can see in your http request later
const CREATE_REVIEW_MUTATION = gql`
    mutation createReview($title: String, $target: String!, $description: String!, $targetType: String) {
        createReview(title: $title, target: $target, targetType: $targetType, description: $description) {
            id
            title
            target
            author {
                id
                name
            }
            description
        }
    }
`;

const DELETE_REVIEW = gql`
    mutation deleteReview($id: String!) {
        deleteReview(id: $id) {
            target
            author {
                name
                id
            }
        }
    }
`

const CREATE_USER_MUTATION = gql`
    mutation createUser($name: String!, $email: String!, $fibauid: String!) {
        createUser(name: $name, email: $email, fibauid: $fibauid) {
            id
            name
            email
        }
    }
`;

const CREATE_GROUP_MUTATION = gql`
    mutation createGroup($name: String!, $description: String!) {
        createGroup(name: $name, description: $description) {
            followers {
                name
            }
            name
            description
        }
    }
`;

const createGroup = (name, description) => gqlRequest(CREATE_GROUP_MUTATION, {name, description});
const createReview = (target, targetType, title, description) => gqlRequest(CREATE_REVIEW_MUTATION, {
    target,
    title,
    description,
    targetType
});
const deleteReview = (id) => gqlRequest(DELETE_REVIEW, {id});


export {
    createGroup,
    createReview,
    deleteReview,
    DELETE_REVIEW,
    CREATE_GROUP_MUTATION,
    CREATE_REVIEW_MUTATION,
    CREATE_USER_MUTATION
}