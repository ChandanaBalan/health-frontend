import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Email submitted:', email);
    }
  };

  return (
    <>
      <div className="bg-primary">
        <footer className="text-white py-4">
          <Container>
            <Row>
              <Col md={4} className="text-light p-4">
                <h4>ABOUT US</h4>
                <p style={{textAlign:"justify"}} >
                  We are dedicated to promoting health and wellness. Our mission is to empower individuals with the knowledge and tools needed for a balanced lifestyle.
                </p>
              </Col>
              <Col md={2} className="text-light p-4">
                <h4>GUIDES</h4>
                <ul className="list-unstyled">
                  <li>Community</li>
                  <li>Customer Service</li>
                  <li>Support Policy</li>
                </ul>
              </Col>
              <Col md={2} className="text-light p-4">
                <h4>LINKS</h4>
                <ul className="list-unstyled">
                  <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
                  <li><Link to="/home/recyclebin" className="text-light text-decoration-none">Recyclebin</Link></li>
                  <li><Link to="/home/viewdetails/:id" className="text-light text-decoration-none">Details</Link></li>
                </ul>
              </Col>
              <Col md={4} className='p-4'>
                <h4 className="text-light ">SUBSCRIBE</h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="border mb-3">
                    <Form.Control 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={handleEmailChange}
                      required 
                    />
                  </Form.Group>
                  <Button type="submit" className="btn btn-dark border border-light">Submit</Button>
                </Form>
              </Col>
            </Row>

            <hr className="bg-white" />
            <div className="text-center pt-2">
              © Healthy You. All rights reserved.
            </div>
          </Container>
        </footer>
      </div>
    </>
  );
}

export default Footer;
