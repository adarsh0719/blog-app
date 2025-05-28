import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner, Alert, Container } from 'react-bootstrap';
import BlogCard from '../components/BlogCard';
import { getBlogs } from '../utils/blogStorage';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const storedBlogs = getBlogs();
      setBlogs(storedBlogs);
      setLoading(false);
    } catch (err) {
      setError('Failed to load blogs');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Container className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <div className="home-page">
      <h1 className="mb-4">Latest Blog Posts</h1>
      {blogs.length === 0 ? (
        <Alert variant="info">
          No blog posts found. Be the first to add one!
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {blogs.map(blog => (
            <Col key={blog.id}>
              <BlogCard blog={blog} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomePage;