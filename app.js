const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

app.use(express.json())
mongoose.connect(config.mongoUrl, { family: 4 })
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app