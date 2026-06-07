import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const NavigationBar = () => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Navbar expand="lg" className="custom-navbar" fixed="top">
      <Container>
        {/* Logo Navbar */}
        <Navbar.Brand as={Link} to="home" smooth={true} offset={-100} duration={500} className="fw-bold fs-4 custom-brand" style={{cursor: 'pointer'}}>
          Porto<span className="text-accent">folio.</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="home" spy={true} smooth={true} offset={-100} duration={500} className="custom-nav-link" style={{cursor: 'pointer'}}>Home</Nav.Link>
            <Nav.Link as={Link} to="about" spy={true} smooth={true} offset={-100} duration={500} className="custom-nav-link" style={{cursor: 'pointer'}}>About</Nav.Link>
            <Nav.Link as={Link} to="services" spy={true} smooth={true} offset={-100} duration={500} className="custom-nav-link" style={{cursor: 'pointer'}}>Services</Nav.Link>
            <Nav.Link as={Link} to="projects" spy={true} smooth={true} offset={-100} duration={500} className="custom-nav-link" style={{cursor: 'pointer'}}>Projects</Nav.Link>
            <Nav.Link as={Link} to="contact" spy={true} smooth={true} offset={-100} duration={500} className="custom-nav-link nav-cta-btn" style={{cursor: 'pointer'}}>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
    </motion.div>
  );
};

export default NavigationBar;