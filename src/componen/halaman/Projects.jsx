import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../supabaseClient';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  // State untuk menyimpan daftar proyek (sekarang murni dari Supabase)
  const [projectsList, setProjectsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Mengambil data proyek dari Supabase saat halaman dimuat
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false }); // Tampilkan berdasarkan urutan custom

      if (data && !error) {
        setProjectsList(data);
      }
    };

    fetchProjects();
  }, []);

  // Fungsi untuk memunculkan modal detail
  const handleShowModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  // Memastikan link selalu berawalan http/https agar peramban langsung membukanya di web eksternal (Vercel)
  const getValidUrl = (url) => {
    if (!url) return '#';
    return url.startsWith('http') ? url : `https://${url}`;
  };

  const filteredProjects = filter === 'all'
    ? projectsList
    : projectsList.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-5" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-5"
        >
          <h6 className="text-accent fw-bold mb-2 tracking-wide">KARYA TERBAIK</h6>
          <h2 className="display-5 fw-bold mb-4" style={{ color: 'var(--text-main)' }}>
            Proyek <span className="text-gradient">Terbaru Saya.</span>
          </h2>
          
          {/* --- Filter Buttons --- */}
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Button 
              className={filter === 'all' ? 'nav-cta-btn border-0 m-0' : 'custom-outline-btn rounded-pill shadow-none'} 
              onClick={() => setFilter('all')}
              style={filter !== 'all' ? { padding: '8px 24px' } : {}}
            >
              Semua
            </Button>
            <Button 
              className={filter === 'website' ? 'nav-cta-btn border-0 m-0' : 'custom-outline-btn rounded-pill shadow-none'} 
              onClick={() => setFilter('website')}
              style={filter !== 'website' ? { padding: '8px 24px' } : {}}
            >
              Website
            </Button>
            <Button 
              className={filter === 'desain' ? 'nav-cta-btn border-0 m-0' : 'custom-outline-btn rounded-pill shadow-none'} 
              onClick={() => setFilter('desain')}
              style={filter !== 'desain' ? { padding: '8px 24px' } : {}}
            >
              Desain
            </Button>
            <Button 
              className={filter === 'dashboard' ? 'nav-cta-btn border-0 m-0' : 'custom-outline-btn rounded-pill shadow-none'} 
              onClick={() => setFilter('dashboard')}
              style={filter !== 'dashboard' ? { padding: '8px 24px' } : {}}
            >
              Dashboard
            </Button>
          </div>
        </motion.div>

        <Row>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <Col lg={4} md={6} className="mb-4" key={project.title}>
              <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                className="h-100"
              >
                <Card className="project-card h-100 bg-transparent border-0 overflow-hidden">
                  <div className="project-img-wrapper">
                    <Card.Img variant="top" src={project.image} className="project-img" />
                    <div className="project-overlay d-none d-lg-flex align-items-center justify-content-center flex-wrap gap-2">
                      <Button onClick={() => handleShowModal(project)} className="nav-cta-btn border-0 m-0">
                        Detail
                      </Button>
                      {project.demoLink && (
                        <Button as="a" href={getValidUrl(project.demoLink)} target="_blank" rel="noopener noreferrer" className="custom-outline-btn rounded-pill shadow-none" style={{ padding: '8px 24px' }}>
                          Demo
                        </Button>
                      )}
                    </div>
                  </div>
                  <Card.Body className="px-0 py-4">
                    <Card.Title className="fw-bold fs-4 mb-2" style={{ color: 'var(--text-main)' }}>
                      {project.title}
                    </Card.Title>
                    <Card.Text style={{ color: 'var(--text-muted)' }}>
                      {project.description}
                    </Card.Text>
                    {/* Tombol Detail & Demo Khusus Layar HP/Tablet */}
                    <div className="d-flex d-lg-none gap-2 mt-3">
                      <Button onClick={() => handleShowModal(project)} className="nav-cta-btn border-0 m-0 flex-grow-1">
                        Detail
                      </Button>
                      {project.demoLink && (
                        <Button as="a" href={getValidUrl(project.demoLink)} target="_blank" rel="noopener noreferrer" className="custom-outline-btn rounded-pill shadow-none flex-grow-1 text-center" style={{ padding: '8px 24px' }}>
                          Demo
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            ))}
          </AnimatePresence>
        </Row>
      </Container>

      {/* --- Modal Detail Proyek --- */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        {selectedProject && (
          <>
            <Modal.Header closeButton closeVariant="white" style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <Modal.Title style={{ color: 'var(--text-main)' }}>{selectedProject.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}>
              <img src={selectedProject.image} alt={selectedProject.title} className="img-fluid rounded mb-4" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
              <h5 className="text-accent mb-3">Detail Proyek</h5>
              <p style={{ color: 'var(--text-muted)', whiteSpace: 'pre-line' }}>{selectedProject.detail || selectedProject.description}</p>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <Button variant="secondary" onClick={handleCloseModal} className="rounded-pill border-0" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                Tutup
              </Button>
              {selectedProject.detailLink && (
                <Button as="a" href={getValidUrl(selectedProject.detailLink)} target="_blank" rel="noopener noreferrer" className="custom-outline-btn rounded-pill shadow-none" style={{ padding: '8px 24px' }}>
                  Kunjungi Detail
                </Button>
              )}
              {selectedProject.demoLink && (
                <Button as="a" href={getValidUrl(selectedProject.demoLink)} target="_blank" rel="noopener noreferrer" className="nav-cta-btn border-0 m-0">
                  Kunjungi Demo
                </Button>
              )}
            </Modal.Footer>
          </>
        )}
      </Modal>
    </section>
  );
};

export default Projects;