const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = graphql;

// In the graphql type, the fields indicated are the one that will be freely shared / accessible by every user of the app
// This is why we do not have 'password' even though it is defined in the mongoDB schema
// Same if there are info that should have limitation access eg. private messages of user >> we don't want to give access to such resources to everyone so it would't be define in the graphQL type
const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        email: { type: GraphQLString }
    }
})

module.exports = UserType;