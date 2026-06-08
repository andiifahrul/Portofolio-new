import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaCode, FaPaintBrush, FaChartBar } from 'react-icons/fa';

const Services = () => {
  // Data layanan yang bisa Anda tawarkan
  const servicesList = [
    {
      title: "Web Development",
      description: "Membangun website modern yang cepat, aman, dan responsif menggunakan teknologi terbaru seperti React JS dan Bootstrap.",
      icon: <FaCode size={28} />,
      delay: 0.1
    },
    {
      title: "UI/UX Design",
      description: "Merancang antarmuka pengguna yang estetik dan intuitif untuk memberikan pengalaman pengguna yang luar biasa.",
      icon: <FaPaintBrush size={26} />,
      delay: 0.2
    },
    {
      title: "Dashboard Development",
      description: "Membangun antarmuka dashboard data yang interaktif dan kompleks, menyajikan visualisasi informasi yang intuitif dan berkinerja tinggi.",
      icon: <FaChartBar size={28} />,
      delay: 0.3
    }
  ];

  return (
    <section id="services" className="py-5" style={{ backgroundColor: 'var(--bg-main)' }}>
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-5"
        >
          <h6 className="text-accent fw-bold mb-2 tracking-wide">LAYANAN SAYA</h6>
          <h2 className="display-5 fw-bold" style={{ color: 'var(--text-main)' }}>
            Apa Yang Bisa <span className="text-accent">Saya Lakukan.</span>
          </h2>
        </motion.div>

        <Row>
          {servicesList.map((service, index) => (
            <Col lg={4} md={6} className="mb-4" key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: service.delay }}
                viewport={{ once: true, amount: 0.2 }}
                className="h-100"
              >
                <Card className="service-card h-100 p-4 border-0">
                  <div className="service-icon-box mb-4 d-flex align-items-center justify-content-center rounded-circle">
                    <span className="text-white d-flex">{service.icon}</span>
                  </div>
                  <Card.Title className="fw-bold fs-4 mb-3" style={{ color: 'var(--text-main)' }}>
                    {service.title}
                  </Card.Title>
                  <Card.Text style={{ color: 'var(--text-muted)' }}>
                    {service.description}
                  </Card.Text>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;