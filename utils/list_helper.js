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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}