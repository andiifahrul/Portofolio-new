import React, { useState, useEffect } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { supabase } from '../../supabaseClient';

const ProjectList = ({ onEdit }) => {
  const [projectsList, setProjectsList] = useState([]);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })
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

  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index); // Diperlukan untuk browser Firefox
  };

  const handleDragEnter = (e, index) => {
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const newList = [...projectsList];
    const draggedItem = newList[draggedItemIndex];
    
    newList.splice(draggedItemIndex, 1);
    newList.splice(index, 0, draggedItem);
    
    setDraggedItemIndex(index);
    setProjectsList(newList);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Diperlukan agar elemen bisa di-drop
  };

  const handleDragEnd = async () => {
    setDraggedItemIndex(null);
    setIsSavingOrder(true);
    try {
      // Update urutan di Supabase satu per satu secara paralel
      const updatePromises = projectsList.map((p, index) => 
        supabase
          .from('projects')
          .update({ display_order: index + 1 })
          .eq('id', p.id)
      );
      const results = await Promise.all(updatePromises);
      const errorResult = results.find(res => res.error);
      if (errorResult) throw errorResult.error;
    } catch (error) {
      alert("Gagal menyimpan urutan: " + error.message);
    } finally {
      setIsSavingOrder(false);
    }
  };

  return (
    <Card className="p-4 border-secondary shadow-lg" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-accent mb-0">Daftar Proyek Anda</h4>
        {isSavingOrder && <small className="text-info">Menyimpan urutan...</small>}
      </div>
      <p className="text-muted small mb-4">Tahan dan geser (drag & drop) baris proyek di bawah ini untuk mengatur urutannya.</p>
      <div className="table-responsive">
        <Table hover variant="dark" className="align-middle" style={{ userSelect: 'none' }}>
          <thead>
            <tr>
              <th>Urutan</th>
              <th>Gambar</th>
              <th>Judul Proyek</th>
              <th>Kategori</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {projectsList.length > 0 ? projectsList.map((p, index) => (
              <tr 
                key={p.id} 
                draggable 
                onDragStart={(e) => handleDragStart(e, index)} 
                onDragEnter={(e) => handleDragEnter(e, index)} 
                onDragOver={handleDragOver} 
                onDragEnd={handleDragEnd} 
                style={{ 
                  opacity: draggedItemIndex === index ? 0.5 : 1, 
                  cursor: draggedItemIndex !== null ? 'grabbing' : 'grab',
                  backgroundColor: draggedItemIndex === index ? 'rgba(255, 255, 255, 0.05)' : 'inherit'
                }}
              >
                <td><span className="me-2" style={{ cursor: 'grab', opacity: 0.5 }}>☰</span> {index + 1}</td>
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
                <td colSpan="5" className="text-center text-muted py-4">Belum ada proyek yang ditambahkan.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Card>
  );
};

export default ProjectList;