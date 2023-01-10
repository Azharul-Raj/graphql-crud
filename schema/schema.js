const { projects, clients } = require('./data');
const User = require('../models/User');
const Course = require('../models/Course');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');   

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString}
    })
})

const CourseType = new GraphQLObjectType({
    name: "Course",
    fields: () => ({
        id: { type: GraphQLID },
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId)
            }
        }
       
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        courses: {
            type: GraphQLList(CourseType),
            resolve() {
                return Course.find();
            }
        },
        course: {
            type: CourseType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Course.findById(args.id)
            }
        },
        users: {
            type: GraphQLList(UserType),
            resolve() {
                return User.find();
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return User.findById(args.id);
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: "Mutations",
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const user = new User({
                    name: args.name,
                    email: args.email,
                    phone:args.phone
                })
                return user.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})