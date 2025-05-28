import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const BlogCard = ({ blog }) => {
  return (
    <Card 
      className="blog-card h-100" 
      style={{ 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf9 100%)',
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)'
      }}
    >
      <Card.Body>
        <Card.Title className="text-truncate" style={{ color: '#2d3748' }}>
          {blog.title}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {format(new Date(blog.date), 'MMM dd, yyyy - h:mm a')}
        </Card.Subtitle>
        <Card.Text className="summary-text" style={{ color: '#4a5568' }}>
          {blog.summary}
        </Card.Text>
        <Link 
          to={`/blog/${blog.id}`} 
          className="btn btn-primary"
          style={{ 
            background: '#4299e1',
            border: 'none',
            fontWeight: 600
          }}
        >
          Read More
        </Link>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;