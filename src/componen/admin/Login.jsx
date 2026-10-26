import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Proses autentikasi (login) melalui Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert('Login gagal: ' + error.message);
    } else {
      // Jika berhasil, arahkan ke halaman admin
      navigate('/admin');
    }
    setIsLoading(false);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center text-light" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      <Card className="p-4 border-secondary w-100" style={{ maxWidth: '400px', backgroundColor: 'var(--bg-surface)' }}>
        <div className="text-center mb-4">
          <h3 className="text-accent fw-bold">Login Admin</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>Masukkan email dan password untuk masuk</p>
        </div>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="custom-input" placeholder="admin@email.com" />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="custom-input" placeholder="******" />
          </Form.Group>
          <Button className="nav-cta-btn border-0 w-100 mb-3" type="submit" disabled={isLoading} style={{ marginLeft: 0 }}>
            {isLoading ? 'Memproses...' : 'Masuk'}
          </Button>
          <div className="text-center">
            <Link to="/" className="text-muted text-decoration-none" style={{ fontSize: '0.9rem' }}>
              &larr; Kembali ke Beranda
            </Link>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;