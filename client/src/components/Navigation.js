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
import { BrowserRouter, Switch, Route, Link, Routes } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import RegisterMentee from "./RegisterMentee";
import RegisterMentor from "./RegisterMentor";
import Login from "./Login";

export default function Navigation() {
  return (
    <BrowserRouter>
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Mentor-Connect</Navbar.Brand>
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
                  <NavDropdown.Item href="#action/3.1">
                    Login as Mentee
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Login as Mentor
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/signup-mentee">
            <RegisterMentee />
          </Route>
          <Route path="/signup-mentor">
            <RegisterMentor />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// export default Navigation;
