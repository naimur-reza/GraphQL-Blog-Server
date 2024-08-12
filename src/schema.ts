export const typeDefs = `#graphql
    type Query {
        users: [User]
        posts: [Post]
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
