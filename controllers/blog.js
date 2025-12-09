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

blogRouter.delete('/:id',async (req, res)=>{
  const blogId = req.params.id;
  const mongoResponse = await Blog.findByIdAndDelete(blogId);
  return res.status(204).json(mongoResponse);
})

blogRouter.get('/:id',async(req,res)=>{
  const blogFromAPI = await Blog.findById(req.params.id);
  return res.status(200).json(blogFromAPI);
})

blogRouter.put('/:id', async (req, res)=>{
  const blogIdFromReq = req.params.id;
  const likesToUpdate = req.body.likes;
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogIdFromReq,
    {$set: {likes: likesToUpdate}},
    {new: true, runValidators: true},
  ).lean();

  return res.status(200).json(updatedBlog);
});


module.exports = blogRouter;