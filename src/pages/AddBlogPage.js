import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addBlog } from '../utils/blogStorage';

const AddBlogPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }
    
    // Auto-generate summary if empty
    if (!formData.summary.trim()) {
      formData.summary = formData.content.slice(0, 100) + 
                         (formData.content.length > 100 ? '...' : '');
    }

    setIsSubmitting(true);
    
    try {
      const newBlog = addBlog({
        title: formData.title,
        content: formData.content,
        summary: formData.summary
      });
      navigate(`/blog/${newBlog.id}`);
    } catch (err) {
      setError('Failed to save blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="add-blog-page py-4">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Create New Blog Post</h1>
        <p className="text-muted">Share your thoughts with the world</p>
      </div>
      
      <Card 
        className="shadow-lg border-0 rounded-4 overflow-hidden"
        style={{ 
          borderTop: '4px solid #4299e1',
          backgroundColor: '#e2e8f0'
        }}
      >
        <Card.Body className="p-4 p-md-5">
          {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label className="fw-medium">Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a compelling title"
                className="py-3 rounded-3 border-2"
                style={{ borderColor: '#cbd5e0' }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="summary">
              <Form.Label className="fw-medium">
                Summary <span className="text-muted">(optional)</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="A short preview of your content (auto-generated if empty)"
                className="rounded-3 border-2"
                style={{ borderColor: '#cbd5e0' }}
              />
              <Form.Text className="text-muted">
                {formData.summary.length}/120 characters
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-5" controlId="content">
              <Form.Label className="fw-medium">Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your amazing content here..."
                className="rounded-3 border-2"
                style={{ borderColor: '#cbd5e0' }}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-3 pt-2">
              <Button 
                variant="outline-secondary" 
                onClick={() => navigate('/')}
                className="px-4 py-2 rounded-3 fw-medium"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                className="px-4 py-2 rounded-3 fw-medium"
                style={{ 
                  background: '#4299e1', 
                  border: 'none',
                  minWidth: '140px'
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Publishing...
                  </>
                ) : 'Publish Blog'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddBlogPage;