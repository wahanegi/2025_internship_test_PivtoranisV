import React from 'react';
import { Button, Col, Dropdown, NavItem, NavLink } from 'react-bootstrap';

const LeftSideBar = ({ user }) => {
  const handleLogout = async () => {
    try {
      const csrfToken = document.querySelector(
        'meta[name="csrf-token"]'
      ).content;

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
    <Col xs={3} className="h-100">
      <Dropdown
        as={NavItem}
        className="card-black border border-secondary rounded-pill custom-hover"
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
    </Col>
  );
};

export default LeftSideBar;
