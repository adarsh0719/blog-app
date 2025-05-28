export const saveBlogs = (blogs) => {
  localStorage.setItem('blogs', JSON.stringify(blogs));
};

export const getBlogs = () => {
  const blogs = localStorage.getItem('blogs');
  return blogs ? JSON.parse(blogs) : [];
};

export const getBlogById = (id) => {
  const blogs = getBlogs();
  return blogs.find(blog => blog.id === id);
};

export const addBlog = (blog) => {
  const blogs = getBlogs();
  const newBlog = {
    ...blog,
    id: Date.now().toString(),
    date: new Date().toISOString()
  };
  const updatedBlogs = [newBlog, ...blogs];
  saveBlogs(updatedBlogs);
  return newBlog;
};