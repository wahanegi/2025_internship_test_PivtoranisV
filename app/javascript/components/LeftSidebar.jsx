import React from 'react';
import {
  Button,
  Col,
  Container,
  Dropdown,
  Navbar,
  NavItem,
  NavLink,
} from 'react-bootstrap';
import { FaTwitter, FaHome, FaSearch, FaRegBell, FaUser } from 'react-icons/fa';
import { getCSRFToken } from '../utils';

const LeftSidebar = ({ user }) => {
  const handleLogout = async () => {
    try {
      const csrfToken = getCSRFToken();

      const response = await fetch('/users/sign_out', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      });

      if (response.ok) {
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Col className="h-100 overflow-hidden my-2 ms-5 col-3">
      {user ? (
        <>
          <Navbar>
            <Container>
              <Navbar.Brand href="/">
                <FaTwitter className="text-primary h1 custom-hover" />
              </Navbar.Brand>
            </Container>
          </Navbar>
          <Navbar className="w-75 custom-hover">
            <Container>
              <Navbar.Brand href="/">
                <FaHome className="text-primary h2 rounded" />
                <span className="ms-4 text-light h4">Home</span>
              </Navbar.Brand>
            </Container>
          </Navbar>
          <Navbar>
            <Container>
              <Navbar.Brand>
                <FaSearch className="text-primary h2 rounded" />
                <span className="ms-4 text-light h4">Explore</span>
              </Navbar.Brand>
            </Container>
          </Navbar>
          <Navbar>
            <Container>
              <Navbar.Brand>
                <FaRegBell className="text-primary h2 rounded" />
                <span className="ms-4 text-light h4">Notifications</span>
              </Navbar.Brand>
            </Container>
          </Navbar>
          <Navbar className="w-75 custom-hover">
            <Container>
              <Navbar.Brand href="/users/edit">
                <FaUser className="text-primary h2 rounded" />
                <span className="ms-4 text-light h4">Profile</span>
              </Navbar.Brand>
            </Container>
          </Navbar>
          <hr />
          <Dropdown
            as={NavItem}
            className="card-black border border-secondary rounded-pill custom-hover mt-5"
          >
            <Dropdown.Toggle
              as={NavLink}
              className="text-white py-2 px-4 w-100 text-center"
            >
              Hi, @{user?.attributes?.user_name}
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark rounded shadow-lg">
              <Dropdown.Item>
                <Button
                  onClick={handleLogout}
                  variant="outline-light"
                  className="w-100 rounded-pill"
                >
                  Log Out
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ) : (
        <FaTwitter className="text-primary h1 custom-hover" />
      )}
    </Col>
  );
};

export default LeftSidebar;
