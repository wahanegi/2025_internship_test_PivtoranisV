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
import { FaTwitter, FaHome, FaInfo, FaRegBell, FaUser } from 'react-icons/fa';
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
              <Navbar.Brand href="/" className="custom-hover p-2 rounded">
                <FaTwitter className="text-primary h2" />
              </Navbar.Brand>
            </Container>
          </Navbar>
          <Navbar className="w-75">
            <Container>
              <Navbar.Brand href="/" className="custom-hover p-2 rounded">
                <FaHome className="text-primary h3 rounded" />
                <span className="ms-4 text-light h5">Home</span>
              </Navbar.Brand>
            </Container>
          </Navbar>
          <Navbar>
            <Container>
              <Navbar.Brand className="p-2">
                <FaInfo className="text-primary h3 rounded" />
                <span className="ms-4 text-light h5">About</span>
              </Navbar.Brand>
            </Container>
          </Navbar>
          <Navbar>
            <Container>
              <Navbar.Brand className="p-2">
                <FaRegBell className="text-primary h3 rounded" />
                <span className="ms-4 text-light h5">Notifications</span>
              </Navbar.Brand>
            </Container>
          </Navbar>
          <Navbar className="w-75">
            <Container>
              <Navbar.Brand
                href="/users/edit"
                className="custom-hover p-2 rounded"
              >
                <FaUser className="text-primary h3 rounded" />
                <span className="ms-4 text-light h5">Profile</span>
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
        <>
          <Navbar>
            <Container>
              <Navbar.Brand href="/" className="custom-hover p-2 rounded">
                <FaTwitter className="text-primary h2" />
              </Navbar.Brand>
            </Container>
          </Navbar>
          <Navbar className="w-75">
            <Container>
              <Navbar.Brand href="/" className="custom-hover p-2 rounded">
                <FaHome className="text-primary h3 rounded" />
                <span className="ms-4 text-light h5">Home</span>
              </Navbar.Brand>
            </Container>
          </Navbar>
          <Navbar>
            <Container>
              <Navbar.Brand className="p-2">
                <FaInfo className="text-primary h3 rounded" />
                <span className="ms-4 text-light h5">About</span>
              </Navbar.Brand>
            </Container>
          </Navbar>
        </>
      )}
    </Col>
  );
};

export default LeftSidebar;
