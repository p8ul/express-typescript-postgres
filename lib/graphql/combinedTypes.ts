import { gql } from 'apollo-server-express';
import userTypes from './user/types';

const queryTypes = gql`
    scalar Date

    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
`;

const combinedTypes = [userTypes, queryTypes]

export default combinedTypes;