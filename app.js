const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const env = require('dotenv').config();

// Load schema & resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolve/resolve')
const mongoDBMethods = require('./models/db')
const PORT = env.parsed.PORT || 3000

const connectDB = async () => {
   try {
      await mongoose.connect(env.parsed.DB_URI);
      console.log('MongoDB Connected!')
   } catch (err) {
      console.log(err);
      process.exit();
   }
}
 const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => mongoDBMethods
 })

 connectDB();
 const app = express()
 server.start().then(() => {
    server.applyMiddleware({ app })

    app.listen({ port: PORT }, () => {
       console.log(`Server is running at port http://localhost:${PORT}${server.graphqlPath}`)
    })
 })