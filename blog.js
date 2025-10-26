const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema);

// const mongoUrl = 'mongodb://localhost/bloglist'
const mongoUrl = process.env.MONGODB_URI;

mongoose.connect(mongoUrl)
.then((response)=>{
  console.info("Succefully connected!");
}).catch(err => console.error("something went wrong"));

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  }).catch(err => response.status(404).json({error: "something went wrong"}))
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})