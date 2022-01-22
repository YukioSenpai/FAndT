import { ApolloServer } from "apollo-server-express"
import express from "express"
import { createServer } from "http"
import { createContext } from "./prisma/client"
import { resolvers } from './resolvers'
import { typeDefs } from './schema'

const startServer = async () => { 
  const app = express()
  const httpServer = createServer(app)

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: createContext
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({
      app,
      path: '/api'
  })

  httpServer.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`Server listening on localhost:4000${apolloServer.graphqlPath}`)
  )
}

startServer()