const axios = require('axios')
const _ = require('lodash')
const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
} = graphql

// const users = [
//     { 
//         "id": "1",
//         "firstName": "Ivan",
//         "lastName": "Pilot",
//         "managerId": "1"
//     },
//     {
//         "id": "2",
//         "firstName": "Dalila",
//         "lastName": "Hammoud",
//         "managerId": "1"
//     },
//     { 
//         "id": "3",
//         "firstName": "Paul",
//         "lastName": "Lynch",
//         "managerId": "1"
//     }
// ]

const HotelType = new GraphQLObjectType({
    name: 'Hotel',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        city: {type: GraphQLString},
        managers: {
            type: new GraphQLList(ManagerType),
            resolve(parentValue, args){
                return axios.get(`http://localhost:5005/hotels/${parentValue.id}/managers`)
                .then(result => result.data)
            }
        }
    })
})

const ManagerType = new GraphQLObjectType({
    name: 'Manager',
    fields: () => ({
        id: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parentValue, args){
                return axios.get(`http://localhost:4005/users/${parentValue.userId}`)
                .then(result => result.data)
            }
        },
        hotel: {
            type: HotelType,
            resolve(parentValue, args){
                return axios.get(`http://localhost:5005/hotels/${parentValue.hotelId}`)
                .then(result => result.data)
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLInt},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        manager: {
            type: ManagerType,
            resolve(parentValue, args){
                return axios.get(`http://localhost:5005/managers/${parentValue.managerId}`)
                .then(result => result.data)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parentValue, args){
                return axios.get(`http://localhost:4005/users/${args.id}`)
                .then(result => result.data)
            }
        },
        manager: {
            type: ManagerType,
            args: {id: {type: GraphQLString}},
            resolve(parentValue, args){
                return axios.get(`http://app.local:5005/managers/${args.id}`)
                .then(result => result.data)
            }
        },
        hotel: {
            type: HotelType,
            args: {id: {type: GraphQLString}},
            resolve(parentValue, args){
                return axios.get(`http://app.local:5005/hotels/${args.id}`)
                .then(result => result.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    // hotelQuery: RootQueryHotel,
})