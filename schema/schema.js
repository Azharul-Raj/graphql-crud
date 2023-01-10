const { projects, clients } = require('./data');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');   

const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLID },
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString}
    })
})
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLID },
        name:{type:GraphQLString},
        clientId:{type:GraphQLString},
        description:{type:GraphQLString},
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            // args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return clients.find(client => client.id === parent.id);
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        projects: {
            type: GraphQLList(ProjectType),
            resolve() {
                return projects;
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return projects.find(project => project.id === args.id);
            }
        },
        clients: {
            type: GraphQLList(ClientType),
            resolve() {
                return clients;
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return clients.find(client => client.id === args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})