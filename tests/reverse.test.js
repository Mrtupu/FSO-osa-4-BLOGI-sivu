const {test, describe} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')

const reverse = require('../utils/for_testing').reverse

test('reverse of a', () => {
    const result = reverse('a')
    
    assert.strictEqual(result, 'a')
})

test('reverse of react',() => {
    const result = reverse('react')
    
    assert.strictEqual(result, 'tcaer')
})

test('reverse of saippuakauppias', () => {
    const result = reverse('saippuakauppias')
    
    assert.strictEqual(result, 'saippuakauppias')
})

test('dummy returns one', () => {
    const blogs = []
    
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})



describe('average', () => {
    const average = array => {
        const reducer = (sum, item) => {
            return sum + item
        }
        return array.length === 0
            ? 0
            : array.reduce(reducer, 0) / array.length
    }
    test('of one value is the value itself', () => {
        assert.strictEqual(average([1]), 1)
    })

    test('of many is calculated right', () => {
        assert.strictEqual(average([1,2,3,4,5,6]), 3.5)
    })

    test('of empty array is zero', () => {
        assert.strictEqual(average([]), 0)
    })
})

describe('total likes', () => {
    const listwithOneBlog = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 5,
            __v: 0
          },
    ]
    const Blogs = [
         {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
          },
          {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
          },
          {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
          },
          {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
          },
          {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
          },
          {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
          }  
      ]
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listwithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('when list has multiple blogs, equals the sum of likes', () => {
        const result = listHelper.totalLikes(Blogs)
        assert.strictEqual(result, 36)
    })

    test('when list is empty, equals zero', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })
})

describe('favorite blog', () => {
    const listwithOneBlog = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
    ]
    const Blogs = [
        {
           _id: "5a422a851b54a676234d17f7",
           title: "React patterns",
           author: "Michael Chan",
           url: "https://reactpatterns.com/",
           likes: 7,
           __v: 0
         },
         {
           _id: "5a422aa71b54a676234d17f8",
           title: "Go To Statement Considered Harmful",
           author: "Edsger W. Dijkstra",
           url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
           likes: 5,
           __v: 0
         },
         {
           _id: "5a422b3a1b54a676234d17f9",
           title: "Canonical string reduction",
           author: "Edsger W. Dijkstra",
           url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
           likes: 12,
           __v: 0
         },
         {
           _id: "5a422b891b54a676234d17fa",
           title: "First class tests",
           author: "Robert C. Martin",
           url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
           likes: 10,
           __v: 0
         },
         {
           _id: "5a422ba71b54a676234d17fb",
           title: "TDD harms architecture",
           author: "Robert C. Martin",
           url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
           likes: 0,
           __v: 0
         },
         {
           _id: "5a422bc61b54a676234d17fc",
           title: "Type wars",
           author: "Robert C. Martin",
           url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
           likes: 2,
           __v: 0
         }  
     ]

    test('when list has only one blog, equals the blog itself', () => {
        const result = listHelper.favoriteBlog(listwithOneBlog)
        assert.deepStrictEqual(result, Blogs[0])
    })

    test('when list has multiple blogs, equals the blog with most likes', () => {
        const result = listHelper.favoriteBlog(Blogs)
        assert.deepStrictEqual(result, Blogs[2])
    })

    test('when list is empty, equals null', () => {
        const result = listHelper.favoriteBlog([])
        assert.strictEqual(result, null)
    })
})