import { ApolloServer } from "apollo-server-express"
import "dotenv/config"
import express from "express"
import { createServer } from "http"
import { resolvers } from './resolvers'
import { typeDefs } from './schema'

const startServer = async () => { 
  const app = express()
  const httpServer = createServer(app)

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res })
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