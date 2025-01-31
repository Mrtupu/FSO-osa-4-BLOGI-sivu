const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  res.send('<h1>blogi sivu</h1>')
})

blogsRouter.get('/api/blogs', async (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
})

blogsRouter.get('/api/blogs/:id',async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if(blog){
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.delete('/api/blogs/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.post('/api/blogs', async (req, res) => {
  const body = req.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

module.exports = blogsRouter