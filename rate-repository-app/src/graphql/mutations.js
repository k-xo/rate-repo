import { gql } from '@apollo/client';

export const AUTHORIZE_MUTATION = gql`
    mutation Authorize($username: String!, $password: String!) {
        authorize(credentials: { username: $username, password: $password }) {
            accessToken
        }
    }
`;
