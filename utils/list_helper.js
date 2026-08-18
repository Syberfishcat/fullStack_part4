const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((pre, cur) => {
    return pre + cur.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) return {}
  result = blogs[0];
  blogs.forEach(element => {
    if(element.likes > result.likes) {
      result = element
    }
  });
  return result
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const blogCounts = _.countBy(blogs, 'author')
  const authors = Object.entries(blogCounts).map(entry => {
    return {
      author: entry[0],
      blogs: entry[1]
    }
  })
  return _.maxBy(authors, 'blogs')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
