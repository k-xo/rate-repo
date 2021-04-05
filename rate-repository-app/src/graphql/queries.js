import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
                node {
                    id
                    fullName
                    description
                    language
                    stargazersCount
                    forksCount
                    reviewCount
                    ratingAverage
                    ownerAvatarUrl
                }
            }
        }
    }
`;

export const GET_SINGLE_REPO = gql`
    query repository($id: ID!) {
        repository(id: $id) {
            id
            fullName
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;

export const AUTHORIZED_USER = gql`
    query {
        authorizedUser {
            id
            username
        }
    }
`;
