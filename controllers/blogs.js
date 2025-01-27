const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  res.send('<h1>blogi sivu</h1>')
})

blogsRouter.get('/api/blogs', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
})

blogsRouter.post('/api/blogs', (req, res) => {
  const body = req.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  blog.save()
    .then(result => {
      res.json(result)
    })
    .catch(error => {
      res.status(400).json({ error: error.message })
    })
})

module.exports = blogsRouter