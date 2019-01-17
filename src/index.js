import { GraphQLServer , PubSub } from 'graphql-yoga'
import { resolvers } from '../graphql/resolvers'


const typeDefs = `
  type Query {
    items: [Item!]!
  }

  type Item {
    name: String!
  }

  type Mutation {
    addItem(name: String!): Item!
  }

  type Subscription {
    itemAdd: Item!
  }
`
const options = { port: 4000 }

const pubsub = new PubSub()
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } })

server.start(options, () => console.log('Server is running on localhost:' + options.port))
