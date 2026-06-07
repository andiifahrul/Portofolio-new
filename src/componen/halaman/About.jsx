import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import aboutImage from '../../Assets/aboutme.jpg'; // Pastikan Anda memiliki gambar ini di folder Assets

const About = () => {
  // Daftar skill Anda, bisa disesuaikan nanti
  const skills = ["React JS", "Node JS", "Bootstrap", "Tailwind", "Figma", "Git"];

  return (
    <section id="about" className="py-5" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <Container className="py-5">
        <Row className="align-items-center">
          
          {/* --- Bagian Gambar / Visual (Kiri) --- */}
          <Col lg={5} className="mb-5 mb-lg-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }} // Animasi jalan saat 30% elemen terlihat
              className="about-img-wrapper"
            >
              {/* Gambar Profil/About */}
              <img 
                src={aboutImage} 
                alt="Tentang Saya" 
                className="rounded-4 shadow-lg position-relative"
                style={{ 
                  width: '100%', 
                  height: '450px', 
                  objectFit: 'cover', 
                  zIndex: 2,
                  border: '2px solid rgba(217, 4, 41, 0.6)', 
                  boxShadow: '0 10px 30px rgba(217, 4, 41, 0.2)', // Memberikan efek glow/cahaya merah
                  filter: 'grayscale(10%) sepia(15%) hue-rotate(320deg) brightness(0.9) contrast(110%)' // Toning disesuaikan agar tidak terlalu gelap
                }} 
              />
              {/* Efek cahaya merah di belakang gambar */}
              <div className="about-decoration rounded-circle position-absolute"></div>
            </motion.div>
          </Col>

          {/* --- Bagian Teks (Kanan) --- */}
          <Col lg={7} className="px-lg-5">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h6 className="text-accent fw-bold mb-2 tracking-wide">TENTANG SAYA</h6>
              <h2 className="display-5 fw-bold mb-4" style={{ color: 'var(--text-main)' }}>
                Kreativitas Bertemu <span className="text-gradient">Logika.</span>
              </h2>
              <p className="lead mb-4" style={{ color: 'var(--text-muted)' }}>
                Saya adalah seorang Web Developer yang fokus pada pembuatan pengalaman digital yang luar biasa. Saya menggabungkan desain antarmuka yang indah dengan kode struktur yang bersih untuk menciptakan *website* yang tidak hanya menarik secara visual, tetapi juga memiliki performa tinggi.
              </p>
              
              <h5 className="mb-3" style={{ color: 'var(--text-main)' }}>Keahlian Saya:</h5>
              <div className="d-flex flex-wrap gap-2 mb-5">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Badge pill bg="transparent" className="border border-danger text-light p-2 px-3 fs-6 custom-badge">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              <button className="nav-cta-btn border-0 py-2 px-4 fs-5">
                Unduh CV Saya
              </button>
            </motion.div>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default About;