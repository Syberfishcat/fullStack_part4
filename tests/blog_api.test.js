const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('dummy returns one', () => {
  const result = listHelper.dummy([])
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(helper.initialBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
  test('of empty list is {}', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, {})
  }) 

  test('of a list has only one blog, equals the only blog', () => {
    const result = listHelper.favoriteBlog(helper.listWithOneBlog)
    assert.deepStrictEqual(result, helper.listWithOneBlog[0])
  })

  test('of a bigger lis is caclulated right', () => {
    const result = listHelper.favoriteBlog(helper.initialBlogs)
    assert.deepStrictEqual(result, helper.initialBlogs[2])
  })
})

describe('author with most blogs', () => {
  test('of empty list is {}', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, {})
  })

  test('when list has only one blog, returns its author and one blog', () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(helper.initialBlogs)
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('author with most likes', () => {
  test('of empty list is {}', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, {})
  })

  test('when list has only one blog, returns its author and likes', () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(helper.initialBlogs)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
