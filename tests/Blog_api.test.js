const {test, after, beforeEach, describe} = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const helper = require('./test_helper')
const { title } = require('node:process')
const api = supertest(app)

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    test.only ('blogs are returned as json', async () => {
        console.log('entered test')
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test.only('there are two blogs', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, 2)
    })
    describe('viewing a specific blog', () => {
        test('Blog without title is not added', async () => {
            const newBlog = {
                author:'shit',
                url: '',
                likes:10
            }
            await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            
            const response = await api.get('/api/blogs')
            
            assert.strictEqual(response.body.length, helper.initialBlogs.length)
        })
        test('a specific blog can be viewed', async () => {
            const blogsAtStart = await helper.blogsInDb()
            
            const blogToView = blogsAtStart[0]
            
            const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            
            assert.deepStrictEqual(resultBlog.body, blogToView)
        })
    })
    describe('addition of a blog', () => {
        test ('a valid blog can be added', async () => {
            const newBlog = {
                title: 'shit blog',
                author: 'shit',
                url: 'http/shitblog.com',
                likes: 1
            }
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            
            const response = await api.get('/api/blogs')
        
            const content = response.body.map(r => r.title)
        
            assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
        
            assert(content.includes('shit blog'))
        })
        test('fails with status code 400 if data invalid', async () => {
            const newBlog = {
                likes: 2
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
            
            const notesAtEnd = await helper.blogsInDb()

            assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length)
        })
        
    })
    describe('deletion of a blog', () => {
        test('a blog can be deleted', async () => {
            const blogsAtStart = await helper.blogsInDb()
            console.log(blogsAtStart)
            const blogToDelete = blogsAtStart[0]
            console.log(blogsAtStart)
        
            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)
            
            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
        
            const contents = blogsAtEnd.map(r => r.id)
            assert(!contents.includes(blogToDelete.id))
        
        })

    })
})
after(async () => {
    await mongoose.connection.close()
})