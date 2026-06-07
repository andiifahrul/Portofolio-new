import React, { useState, useEffect } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { supabase } from '../../supabaseClient';

const ProjectList = ({ onEdit }) => {
  const [projectsList, setProjectsList] = useState([]);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setProjectsList(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) {
        alert("Gagal menghapus: " + error.message);
      } else {
        alert("Proyek berhasil dihapus.");
        fetchProjects(); // Segarkan data tabel
      }
    }
  };

  return (
    <Card className="p-4 border-secondary shadow-lg" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <h4 className="mb-4 text-accent">Daftar Proyek Anda</h4>
      <div className="table-responsive">
        <Table hover variant="dark" className="align-middle">
          <thead>
            <tr>
              <th>Gambar</th>
              <th>Judul Proyek</th>
              <th>Kategori</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {projectsList.length > 0 ? projectsList.map((p) => (
              <tr key={p.id}>
                <td><img src={p.image} alt={p.title} width="60" height="40" style={{ objectFit: 'cover', borderRadius: '4px' }} /></td>
                <td>{p.title}</td>
                <td className="text-capitalize">{p.category}</td>
                <td>
                  <Button variant="info" size="sm" className="me-2" onClick={() => onEdit(p)}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>Hapus</Button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="text-center text-muted py-4">Belum ada proyek yang ditambahkan.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Card>
  );
};

export default ProjectList;