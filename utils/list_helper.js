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

const mostLikes = (blogs) => {
  if(blogs.length === 0) return {}
  
  const likeCounts = blogs.reduce((pre, cur) => {
    pre[cur.author] = (pre[cur.author] || 0) + cur.likes
    return pre;
  }, {})
  const authors = Object.entries(likeCounts).map(entry => {
    return {
      author: entry[0],
      likes: entry[1]
    }
  })
  return _.maxBy(authors, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
