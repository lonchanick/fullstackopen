const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({});
    return response.status(200).json(blogs);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
})

blogRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    const result = await blog.save();
    return response.status(201).json(result);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
})

module.exports = blogRouter;