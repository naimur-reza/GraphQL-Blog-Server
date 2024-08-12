export const typeDefs = `#graphql
    type Query {
        users: [User]
        posts: [Post]
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!): AuthPayload!
        createPost(title: String!, content: String!, author: ID!, published: Boolean!): Post!
        loginUser(email: String!, password: String!): AuthPayload!
    }

    type AuthPayload {
        token: String!
    }



    type Post {
        id: ID!
        title: String!
        content: String!
        createdAt: String!
        author: User!
        published: Boolean!
         
    }

    type User {
        id: ID!
        name: String!
        email: String!
        posts: [Post]
    } 

`;
