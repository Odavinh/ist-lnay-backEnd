import {gql} from "apollo-server-express";

export default gql`
  type Mutation {
    startRegister(
      name: String!
      surname: String!
      email: String!
      platform: String
    ): result
    finishRegister(id: Int!, password: String!): result
  }
`;