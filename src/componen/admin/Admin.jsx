import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const Admin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [project, setProject] = useState({
    title: '',
    description: '',
    image: '',
    category: 'website',
    demoLink: '',
    detailLink: ''
  });

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

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      let imageUrl = '';

      // 1. Upload gambar ke Supabase Storage (Bucket) jika ada file
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('project-images') // Nama bucket di Supabase
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        // 2. Dapatkan URL publik dari gambar yang baru diupload
        const { data: publicUrlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
      } else {
        alert("Harap pilih gambar proyek terlebih dahulu!");
        setIsLoading(false);
        return;
      }

      // 3. Simpan data proyek (termasuk URL gambar asli) ke tabel 'projects'
      const { error: insertError } = await supabase
        .from('projects')
        .insert([{ ...project, image: imageUrl }]);

      if (insertError) throw insertError;

      alert("Berhasil! Proyek telah ditambahkan ke database.");
      // Bersihkan formulir
      setProject({
        title: '', description: '', image: '',
        category: 'website', demoLink: '', detailLink: ''
      });
      setImageFile(null);
      e.target.reset(); // Mereset kolom input file
    } catch (error) {
      alert("Terjadi kesalahan: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <Container className="py-5 text-light" style={{ minHeight: '100vh', marginTop: '50px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-accent fw-bold m-0">Admin Panel</h2>
        <div>
          <Link to="/" className="btn btn-outline-light rounded-pill me-2">Ke Beranda</Link>
          <Button variant="danger" className="rounded-pill border-0" style={{ backgroundColor: 'var(--accent-main)' }} onClick={handleLogout}>Logout</Button>
        </div>
      </div>
      
      <Card className="p-4 border-secondary" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <h4 className="mb-4">Tambah Proyek Baru</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Judul Proyek</Form.Label>
            <Form.Control type="text" name="title" onChange={handleChange} required className="custom-input" placeholder="Masukkan judul..." />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} required className="custom-input" placeholder="Ceritakan tentang proyek ini..." />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pilih Gambar</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} required className="custom-input" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Link Demo (Opsional)</Form.Label>
            <Form.Control type="text" name="demoLink" onChange={handleChange} className="custom-input" placeholder="https://link-demo-proyek.com" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Link Detail / GitHub (Opsional)</Form.Label>
            <Form.Control type="text" name="detailLink" onChange={handleChange} className="custom-input" placeholder="https://github.com/username/repo" />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Kategori</Form.Label>
            <Form.Select name="category" onChange={handleChange} className="custom-input">
              <option value="website">Website</option>
              <option value="desain">Desain</option>
              <option value="dashboard">Dashboard</option>
            </Form.Select>
          </Form.Group>
          <Button className="nav-cta-btn border-0 w-100" type="submit" disabled={isLoading}>
            {isLoading ? 'Menyimpan...' : 'Simpan Proyek'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Admin;