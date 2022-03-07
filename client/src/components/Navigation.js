import React from "react";
import {
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
  NavDropdown,
  Container,
} from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import RegisterMentee from "./RegisterMentee";
import RegisterMentor from "./RegisterMentor";
import LoginMentee from "./LoginMentee";
import LoginMentor from "./LoginMentor";

export default function Navigation() {
  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">Mentor-Connect</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/about">
                  About Us
                </Nav.Link>
                <NavDropdown title="Sign Up" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/signup-mentee">
                    Join as Mentee
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/signup-mentor">
                    Join as Mentor
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Login" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/login-mentee">
                    Login as Mentee
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/login-mentor">
                    Login as Mentor
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/signup-mentee" element={<RegisterMentee />}></Route>
          <Route path="/signup-mentor" element={<RegisterMentor />}></Route>
          <Route path="/login-mentee" element={<LoginMentee />}></Route>
          <Route path="/login-mentor" element={<LoginMentor />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

// export default Navigation;
