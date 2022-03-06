import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import logo from '../Images/logoipsum.svg';
import { Link } from 'react-router-dom';
let year = new Date().getFullYear();
const Footer = () => {
  return (
    <div className="footer-section">
      <Container>
        <Row>
          <Col xs={8} md={6}>
            <Link to="/" className="footer-logo">
              <img src={logo} alt="" />
            </Link>
            <p className="footer-tagline">
              FarsiDict is a langugage dictionary for farsi and english audio translation
            </p>
          </Col>
          <Col xs={4} md={3}>
            <ul className="footer-menu">
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy</Link>
              </li>
              <li>
                <Link to="/terms">Terms</Link>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={3}>
            <ul className="footer-menu">
              <li>
                <a href="/">Instagram</a>
              </li>
              <li>
                <a href="/">Linkedin</a>
              </li>
              <li>
                <a href="/">Email</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="copyright-text">{year} Dictionary Inc. All rights reserved.</div>
    </div>
  );
};
export default Footer;
