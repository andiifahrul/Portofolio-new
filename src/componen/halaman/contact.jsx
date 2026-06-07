import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-5"
        >
          <h6 className="text-accent fw-bold mb-2 tracking-wide">HUBUNGI SAYA</h6>
          <h2 className="display-5 fw-bold" style={{ color: 'var(--text-main)' }}>
            Mari Bekerja <span className="text-gradient">Sama.</span>
          </h2>
        </motion.div>

        <Row className="gy-5">
          {/* --- Bagian Info Kontak (Kiri) --- */}
          <Col lg={5}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="fw-bold mb-4" style={{ color: 'var(--text-main)' }}>Info Kontak</h3>
              <p style={{ color: 'var(--text-muted)' }} className="mb-4 lead fs-6">
                Apakah Anda memiliki ide proyek yang ingin diwujudkan atau sekadar ingin menyapa? Jangan ragu untuk menghubungi saya!
              </p>
              
              <div className="d-flex flex-column gap-4 mt-5">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="d-flex align-items-center gap-3"
                >
                  <div className="contact-icon-box d-flex align-items-center justify-content-center rounded-circle"><FaEnvelope /></div>
                  <div>
                    <h6 className="mb-1 fw-bold" style={{ color: 'var(--text-main)' }}>Email</h6>
                    <p className="mb-0" style={{ color: 'var(--text-muted)' }}>emailanda@example.com</p>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="d-flex align-items-center gap-3"
                >
                  <div className="contact-icon-box d-flex align-items-center justify-content-center rounded-circle"><FaPhone /></div>
                  <div>
                    <h6 className="mb-1 fw-bold" style={{ color: 'var(--text-main)' }}>Telepon</h6>
                    <p className="mb-0" style={{ color: 'var(--text-muted)' }}>+62 812 3456 7890</p>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="d-flex align-items-center gap-3"
                >
                  <div className="contact-icon-box d-flex align-items-center justify-content-center rounded-circle"><FaMapMarkerAlt /></div>
                  <div>
                    <h6 className="mb-1 fw-bold" style={{ color: 'var(--text-main)' }}>Lokasi</h6>
                    <p className="mb-0" style={{ color: 'var(--text-muted)' }}>Jakarta, Indonesia</p>
                  </div>
                </motion.div>

                {/* --- Bagian Sosial Media --- */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="mt-3 pt-4"
                  style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                </motion.div>
              </div>
            </motion.div>
          </Col>

          {/* --- Bagian Form (Kanan) --- */}
          <Col lg={7}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="p-4 p-md-5 rounded-4"
              style={{ backgroundColor: 'var(--bg-surface)' }}
            >
              <Form>
                <Row>
                  <Col md={6} className="mb-4">
                    <Form.Group>
                      <Form.Label style={{ color: 'var(--text-muted)' }}>Nama Lengkap</Form.Label>
                      <Form.Control type="text" placeholder="Masukkan nama" className="custom-input" />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-4">
                    <Form.Group>
                      <Form.Label style={{ color: 'var(--text-muted)' }}>Email</Form.Label>
                      <Form.Control type="email" placeholder="Masukkan email" className="custom-input" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-5">
                  <Form.Label style={{ color: 'var(--text-muted)' }}>Pesan</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Tulis pesan Anda di sini..." className="custom-input" />
                </Form.Group>
                <Button className="nav-cta-btn border-0 w-100 py-3 fs-5" style={{ marginLeft: 0 }}>
                  Kirim Pesan
                </Button>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;