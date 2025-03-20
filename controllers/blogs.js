const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const { error } = require('../utils/logger')
const User = require('../models/user')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  console.log('authorization', authorization)
  if(authorization && authorization.startsWith('bearer ')){
    return authorization.replace('bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})
  res.json(blogs)
})

blogsRouter.get('/:id',async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if(blog){
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const blog = {
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
  res.json(updatedBlog)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if(!decodedToken.id){
    return res.status(401).json({error: 'token invalid'})
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

module.exports = blogsRouter