const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'HTTP methods',
        author: 'John Doe',
        url: 'http://www.example.com',
        likes: 10
    },
    {
        title: 'RESTful web',
        author: 'John Doe',
        url: 'http://www.example.com',
        likes: 9
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'John Doe', url: 'http://www.example.com', likes: 10 })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}