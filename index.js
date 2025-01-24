require('dotenv').config()
const express  = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.get('/', (req, res) => {
    res.send('<h1>blogi sivu</h1>')
})

app.get('/api/blogs', (req, res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs)
    })
})

app.post('/api/blogs', (req, res) => {
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
app.listen(process.env.PORT, () => {
    console.log(`server runnuing on port ${process.env.PORT}`)
})