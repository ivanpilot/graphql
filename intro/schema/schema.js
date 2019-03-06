//The schema file should contained all the knowledge require for graphQL to know what our application data looks like including what properties each object has and how object are related to each other

const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
} = graphql;

//const users = [
//    { id: "23", firstName: 'Bill', age: 20 },
//    { id: "47", firstName: 'Samantha', age: 21 },
//]

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
    }
});

// At least one RootQuery is required with graphQL
// The RootQuery is the entry point to our graph of data. We need to instruct graphQL that what is our entry point.

// The way to read the below is that we create an RootQuery object with args which are required for this root query of a given user.
// It says if you are looking for a user and you give me an id as an argument, I will give you back a user

// The resolve function is fundamental. This is where we actually go into our database and find the actual data we are looking for.
// So far, the other parameters indicate how the data look like while the resolve function indicate WHERE to find the data.
// resolve() takes 2 args: 
// > parentValue - it is not really used except in some cases
// > args - it is an object that gets called with whatever got passed into the original query i.e. if id is present in the args key/value then it will be presents in the args object
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString }},
            resolve(parentValue, args) {
                //return _.find(users, {id: args.id });
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(res => res.data)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});