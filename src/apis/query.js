// import {gql} from "apollo-boost";
import gql from 'graphql-tag';
import gqlRequest from "../components/gqlRequest";


//TODO figure out how graphql ...fragments work

//TODO: reviews should have tags => for groups
const GET_REVIEWS = gql`
    query reviews($userId:String, $username: String) {
        reviews (userId: $userId, username: $username) {
            author {
                id
                name
            }
            description
            targetType
            target
            emoji
            groups {
                name
            }
            updatedAt
            title
        }
    }
`

// const fieldsOnCar = gql`
//     fragment defaultReviewFields on Review {
//         id
//         name
//     }
// `;

const GET_REVIEWS_FOR_GROUPS = gql`
    query reviewsForGroups($groups: [String!]) {
        reviewsForGroups(group: $groups) {
            id
            author {
                id
                name
            }
            description
            targetType
            target
            comments {
                id
                author {
                    id
                    name
                }
            }
        }
    }
`

const GET_REVIEWS_FOR_USERGROUPS = gql`
    query reviewsForUserGroups {
        reviewsForUserGroups {
            id
            author {
                id
                name
            }
            description
            targetType
            target
            comments {
                id
                author {
                    id
                    name
                }
                emoji
                updatedAt
                description
                target
                targetType
                comments {
                    id
                    author {
                        id
                        name
                    }
                    updatedAt
                    description
                    target
                    targetType
                }
            }
            emoji
            groups {
                name
            }
            updatedAt
            title
        }
    }
`

const GET_REVIEWS_FOR_TARGET = gql`
    query reviewsForTaret($target:String!) {
        reviewsForTarget(target: $target) {
            id
            author {
                id
                name
            }
            description
            targetType
            target
            comments {
                id
                author {
                    id
                    name
                }
                emoji
                updatedAt
                description
                target
                targetType
                comments {
                    id
                    author {
                        id
                        name
                    }
                    updatedAt
                    description
                    target
                    targetType
                }
            }
            emoji
            groups {
                name
            }
            updatedAt
            title
        }
    }
`

const GET_GROUPS = gql`
    query groups($userId: String) {
        groups (userId: $userId) {
            id
            name
            description
            reviews {
                title
                author{
                    name
                }
            }
            followers {
                name
            }
        }
    }
`;

const GET_ROLES_FOR_USER = gql`
    query getRoles($userId: String) {
        getRoles(userId: $userId) {
            user {
                id
                name
            }
            role
            group {
                name
                id
            }
        }
    }
`


const GET_USER = gql`
    query user($fibauid: String!) {
        user(fibauid: $fibauid) {
            id
            name

            roles {
                role
                group {
                    id
                    name
                    description
                }
            }
            description

            reviews {
                id
                author {
                    name
                    id
                }
                target
                targetType
                updatedAt
                createdAt
                emoji
                description
            }
        }
    }
`
const GET_USER_BY_NAME = gql`
    query userByName($name: String!) {
        userByName(name: $name) {
            id
            name
            follows{
                name
                followers {
                    name
                }
            }
            description

            reviews {
                id
                author {
                    name
                    id
                }
                target
                targetType
                updatedAt
                createdAt
                emoji
                description
            }
        }
    }
`;

const GET_GROUP = gql`
    query group($groupId: String) {
        group(groupId: $groupId) {
            id
            name
            createdAt
            reviews {
                author {
                    name
                    id
                }
                target
                targetType
                updatedAt
                createdAt
                emoji
                description
            }
            followers {
                name
                id
            }
        }
    }
`;

const GET_GROUP_BY_NAME = gql`
    query getGroup($name: String!){
        groupByName(name:$name)
        {
            name
            id
        }
    }`

const getGroupByName = (name) => gqlRequest(GET_GROUP_BY_NAME, {name});
const getReviewsForUserGroups = () => gqlRequest(GET_REVIEWS_FOR_USERGROUPS, {});
const getReviewsForTarget = (target) => gqlRequest(GET_REVIEWS_FOR_TARGET, {target});
const getReviews = () => gqlRequest(GET_REVIEWS, {});
const getUser = (fibauid) => gqlRequest(GET_USER, {fibauid});


export {
    getReviewsForTarget,
    getUser,
    getReviews,
    getReviewsForUserGroups,
    getGroupByName,
    GET_REVIEWS_FOR_TARGET,
    GET_REVIEWS,
    GET_ROLES_FOR_USER,
    GET_USER,
    GET_USER_BY_NAME,
    GET_GROUPS,
    GET_GROUP
};
