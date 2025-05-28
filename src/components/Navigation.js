import React, { useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  
  const closeMenu = () => setExpanded(false);
  
  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      sticky="top"
      expanded={expanded}
      onToggle={(isOpen) => setExpanded(isOpen)}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold" onClick={closeMenu}>
          <span className="d-inline-block align-middle px-4">
            Blog<span className="text-primary">Hub</span>
          </span>
        </Navbar.Brand>
        
       <div className="d-lg-none ms-auto">
  <Button 
    as={Link}
    to="/add-blog"
    variant="primary"
    className="px-2 py-1"
    onClick={closeMenu}
  >
    Add Blog
  </Button>
</div>

        
        <Navbar.Toggle 
          aria-controls="main-navbar" 
          className="ms-2 border-0"
        />
        
       <Navbar.Collapse id="main-navbar">
  <Nav className="w-100 align-items-center">

    <Nav.Link
      as={Link}
      to="/"
      className={`d-lg-none py-3 ${location.pathname === '/' ? 'active' : ''}`}
      onClick={closeMenu}
    >
      Home
    </Nav.Link>

    <div className="d-none d-lg-flex ms-lg-auto align-items-center gap-3 px-4">
      <Nav.Link
        as={Link}
        to="/"
        className={`${location.pathname === '/' ? 'active' : ''}`}
        onClick={closeMenu}
      >
        Home
      </Nav.Link>

      <Button
        as={Link}
        to="/add-blog"
        variant="primary"
        className="px-3 py-1 fw-medium"
        onClick={closeMenu}
      >
        + Add Blog
      </Button>
    </div>
  </Nav>
</Navbar.Collapse>
      </Container>

    </Navbar>
  );
};

export default Navigation;