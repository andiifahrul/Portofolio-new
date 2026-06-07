import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { supabase } from '../../supabaseClient';

const ProjectForm = ({ projectToEdit, onSuccess, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [project, setProject] = useState({
    title: '', description: '', detail: '', image: '', category: 'website', demoLink: '', detailLink: ''
  });

  // Mengisi form otomatis jika tombol Edit diklik
  useEffect(() => {
    if (projectToEdit) {
      setProject({
        title: projectToEdit.title,
        description: projectToEdit.description,
        detail: projectToEdit.detail || '',
        image: projectToEdit.image,
        category: projectToEdit.category,
        demoLink: projectToEdit.demoLink || '',
        detailLink: projectToEdit.detailLink || ''
      });
    } else {
      setProject({ title: '', description: '', detail: '', image: '', category: 'website', demoLink: '', detailLink: '' });
    }
    setImageFile(null); // Reset input file
  }, [projectToEdit]);

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
      let finalImageUrl = project.image;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage.from('project-images').upload(fileName, imageFile);
        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage.from('project-images').getPublicUrl(fileName);
        finalImageUrl = publicUrlData.publicUrl;
      } else if (!projectToEdit) {
        alert("Harap pilih gambar proyek terlebih dahulu!");
        setIsLoading(false);
        return;
      }

      if (projectToEdit) {
        const { error: updateError } = await supabase.from('projects').update({ ...project, image: finalImageUrl }).eq('id', projectToEdit.id);
        if (updateError) throw updateError;
        alert("Berhasil! Proyek telah diperbarui.");
      } else {
        const { error: insertError } = await supabase.from('projects').insert([{ ...project, image: finalImageUrl }]);
        if (insertError) throw insertError;
        alert("Berhasil! Proyek telah ditambahkan ke database.");
      }

      e.target.reset();
      if (onSuccess) onSuccess(); // Kembali ke daftar setelah sukses
    } catch (error) {
      alert("Terjadi kesalahan: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4 border-secondary shadow-lg" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <h4 className="mb-4 text-accent">{projectToEdit ? 'Edit Proyek' : 'Tambah Proyek Baru'}</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Judul Proyek</Form.Label>
          <Form.Control type="text" name="title" value={project.title} onChange={handleChange} required className="custom-input" placeholder="Masukkan judul..." />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Deskripsi Singkat (Tampil di Kartu)</Form.Label>
          <Form.Control as="textarea" rows={2} name="description" value={project.description} onChange={handleChange} required className="custom-input" placeholder="Penjelasan singkat proyek..." />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Detail Lengkap (Tampil di Pop-up)</Form.Label>
          <Form.Control as="textarea" rows={5} name="detail" value={project.detail} onChange={handleChange} className="custom-input" placeholder="Jelaskan fitur, teknologi yang digunakan, tantangan, dll..." />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Pilih Gambar {projectToEdit && '(Opsional)'}</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} required={!projectToEdit} className="custom-input" />
          {projectToEdit && <Form.Text className="text-muted d-block mt-1">Biarkan kosong jika tidak mengubah gambar.</Form.Text>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Link Demo (Opsional)</Form.Label>
          <Form.Control type="text" name="demoLink" value={project.demoLink} onChange={handleChange} className="custom-input" placeholder="https://..." />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Link Detail Lainnya (Opsional)</Form.Label>
          <Form.Control type="text" name="detailLink" value={project.detailLink} onChange={handleChange} className="custom-input" placeholder="Link Figma, dll..." />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Kategori</Form.Label>
          <Form.Select name="category" value={project.category} onChange={handleChange} className="custom-input">
            <option value="website">Website</option>
            <option value="desain">Desain</option>
            <option value="dashboard">Dashboard</option>
          </Form.Select>
        </Form.Group>
        
        <div className="d-flex gap-2">
          <Button className="nav-cta-btn border-0 w-100 m-0" type="submit" disabled={isLoading}>
            {isLoading ? 'Menyimpan...' : (projectToEdit ? 'Update Proyek' : 'Simpan Proyek')}
          </Button>
          {projectToEdit && (
            <Button variant="secondary" className="w-100 rounded-pill border-0" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} onClick={onCancel}>
              Batal Edit
            </Button>
          )}
        </div>
      </Form>
    </Card>
  );
};

export default ProjectForm;