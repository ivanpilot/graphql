//The schema file should contained all the knowledge require for graphQL to know what our application data looks like including what properties each object has and how object are related to each other

const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql;

//const users = [
//    { id: "23", firstName: 'Bill', age: 20 },
//    { id: "47", firstName: 'Samantha', age: 21 },
//]

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
                .then(res => res.data)
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: { 
            type: CompanyType ,
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                .then(res => res.data)
            }
        }
    })
});

// At least one RootQuery is required with graphQL
// The RootQuery is the entry point to our graph of data. We need to instruct graphQL that what is our entry point.

// The way to read the below is that we create an RootQuery object with args which are required for this root query of a given user.
// It says if you are looking for a user and you give me an id as an argument, I will give you back a userType

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
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString }},
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                .then(res => res.data)
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axios.post(`http://localhost:3000/users`, {
                    firstName: args.firstName,
                    age: args.age        
                }).then(res => res.data)
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args) {
                return axios.delete(`http://localhost:3000/users/${args.id}`).then(res => res.data)
            }
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLString },
                age: { type: GraphQLInt },
                companyId: {type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axios.patch(`http://localhost:3000/users/${args.id}`, args).then(res => res.data)
            }
        }
    }
})

// GraphQLSchema takes in a rootQuery object and return a graphQL instance
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});