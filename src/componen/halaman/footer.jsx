import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="py-4 text-center" style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <Container>
            <p className="mb-0" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              &copy; {new Date().getFullYear()} Nama Anda. All rights reserved.
            </p>
      </Container>
    </footer>
  );
};

export default Footer;