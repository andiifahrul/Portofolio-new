import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('list'); // Default tab: 'list' atau 'form'
  const [projectToEdit, setProjectToEdit] = useState(null);

  // Mengunci halaman: Cek sesi user dari Supabase
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login'); // Lempar kembali ke login jika tidak ada sesi
      }
    };
    checkSession();
  }, [navigate]);

  const handleEdit = (proj) => {
    setProjectToEdit(proj);
    setActiveTab('form'); // Pindah otomatis ke menu form
  };

  // Fungsi ketika form berhasil disubmit atau dibatalkan
  const handleFormDone = () => {
    setProjectToEdit(null);
    setActiveTab('list'); // Pindah otomatis kembali ke daftar
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <Container fluid className="text-light p-0" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      <Row className="g-0 h-100">
        {/* --- Area Sidebar Kiri --- */}
        <Col md={3} lg={2} className="p-4 d-flex flex-column shadow" style={{ backgroundColor: 'var(--bg-surface)', borderRight: '1px solid rgba(255,255,255,0.05)', minHeight: '100vh' }}>
          <div className="mb-5 mt-2">
            <h4 className="text-accent fw-bold m-0">Admin Panel</h4>
            <small className="text-muted" style={{ fontSize: '0.8rem' }}>Portofolio CMS</small>
          </div>
          
          <Nav className="flex-column gap-3 mb-auto">
            <Nav.Link 
              onClick={() => { setActiveTab('form'); setProjectToEdit(null); }} 
              className={`px-3 py-2 rounded custom-nav-link ${activeTab === 'form' && !projectToEdit ? 'active' : 'text-light'}`}
              style={{ cursor: 'pointer', margin: 0, backgroundColor: activeTab === 'form' && !projectToEdit ? 'rgba(217, 4, 41, 0.1)' : 'transparent' }}
            >
              Tambah Project
            </Nav.Link>
            <Nav.Link 
              onClick={() => { setActiveTab('list'); setProjectToEdit(null); }} 
              className={`px-3 py-2 rounded custom-nav-link ${activeTab === 'list' || projectToEdit ? 'active' : 'text-light'}`}
              style={{ cursor: 'pointer', margin: 0, backgroundColor: activeTab === 'list' || projectToEdit ? 'rgba(217, 4, 41, 0.1)' : 'transparent' }}
            >
              Daftar Project
            </Nav.Link>
            
            <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
            
            <Link to="/" className="nav-link text-muted text-decoration-none px-3" style={{ cursor: 'pointer', fontSize: '0.9rem' }}>
              &larr; Ke Beranda Web
            </Link>
          </Nav>

          <Button variant="danger" className="rounded-pill border-0 mt-5 w-100 py-2 shadow" style={{ backgroundColor: 'var(--accent-main)' }} onClick={handleLogout}>
            Logout
          </Button>
        </Col>

        {/* --- Area Konten Kanan --- */}
        <Col md={9} lg={10} className="p-4 p-md-5" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
          {activeTab === 'form' ? (
            <ProjectForm 
              projectToEdit={projectToEdit} 
              onSuccess={handleFormDone} 
              onCancel={handleFormDone} 
            />
          ) : (
            <ProjectList onEdit={handleEdit} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;