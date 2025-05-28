import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Alert } from 'react-bootstrap';
import { getBlogById } from '../utils/blogStorage';
import { format } from 'date-fns';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const blogData = getBlogById(id);
      if (blogData) {
        setBlog(blogData);
      } else {
        setError('Blog post not found');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load blog post');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error || !blog) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error || 'Blog post not found'}</Alert>
        <Button variant="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="blog-detail-page py-4">
      <Button 
        variant="outline-secondary" 
        className="mb-4"
        onClick={() => navigate('/')}
      >
        &larr; Back to Blog List
      </Button>
      
      <article>
        <header className="mb-4">
          <h1>{blog.title}</h1>
          <p className="text-muted">
            Published on {format(new Date(blog.date), 'MMMM dd, yyyy - h:mm a')}
          </p>
        </header>
        
        <div className="blog-content">
          {blog.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-3">{paragraph}</p>
          ))}
        </div>
      </article>
    </Container>
  );
};

export default BlogDetailPage;