const { ApolloServer, gql } = require('apollo-server');


let users = [
    { id: 1, firstName: 'ahmed',lastName: 'ahmed',
     email:'email',isSuspended:true,dob:'11-2-2010' },
     { id: 2, firstName: 'Adel',lastName: 'ahmed',
     email:'email',isSuspended:true,dob:'11-2-2010' },
     { id: 3, firstName: 'Mina',lastName: 'ahmed',
     email:'email',isSuspended:true,dob:'11-2-2010' }
  
];
let comments = [
    {  id: 1, content: "Comment 1",
        user:users[1],
        date: '12-2-2010' },
   
  
];
let articles = [
    { id: 1, title: 'article1',
    body:'sadasd fdsf edad',date:'11-2-2010',
    author:users[0],comments:[comments[0]] },
    { id: 2, title: 'article2',
    body:'sadasd fdsf edad',date:'11-2-2010',
    author:users[0],comments:[comments[0]] },
    { id: 3, title: 'article3',
    body:'sadasd fdsf edad',date:'11-2-2010',
    author:users[0],comments:[comments[0]] }
   
];



const Schema = `
    type User {
        id: ID!
        firstName: String
        lastName: String
        email: String
        isSuspended: Boolean
        dob: String
    }

    type Comment {
        id: ID
        user: User
        content: String
        date: String
    }

    type Article {
        id: ID!
        title: String
        body: String
        comments: [Comment]
        author: User!
    }

    type Query {
        allUsers: [User]
        allArticles: [Article]
        allComments: [Comment]
    }

    type Mutation {
        deleteArticle (id: Int): [Article]
        createArticle(id: Int, title: String, 
        body:String,
        author:Int): [Article]
    }

`

const typeDefs = gql(Schema);
const resolvers = {
    Query: {
        allUsers: () => users,
        allArticles: ()=> articles,
        allComments: ()=> comments
    },
    Mutation: {
        deleteArticle: (_, { id }) => {
            articles = articles.filter((article) => article.id !== id);
            return articles;
        },
        createArticle: (_, { id,  title,
            body,
            author }) => {
            articles.push({id,
                title,
                body,
                author: users.filter((user) => user.id === author)[0],
                });
            return articles;
        }
    }
};
const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});