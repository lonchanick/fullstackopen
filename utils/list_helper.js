const dummy = (blogs) => {
  return 1;
};

const likeCounter = (blogs)=>{
    if(blogs.length === 0)
        return 0;
    else if (blogs.length === 1)
        return blogs[0].likes;
    else
        return blogs.reduce((acc, obj)=> acc+obj.likes, 0);
}

module.exports = {
  dummy,
  likeCounter
};
