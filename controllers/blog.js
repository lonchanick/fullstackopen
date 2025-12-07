const blogRouter = require('express').Router();
const {Blog} = require('../models/blog');

blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  }).catch(error => {
    response.status(500).json({ error: error.message })
  })
})

blogRouter.post('/', async (request, response) => {
  console.log('XXXXXXXXXXXXXX');
  const blog = new Blog(request.body)
  const result = await blog.save();
  return response.status(201).json(result);
})

module.exports = blogRouter;