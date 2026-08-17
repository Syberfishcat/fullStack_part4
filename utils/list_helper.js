const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((pre, cur) => {
    return pre + cur.likes
  }, 0)
}

module.exports = {
  dummy,
  totalLikes
}