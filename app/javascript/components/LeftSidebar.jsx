import React from 'react';
import { Button, Col } from 'react-bootstrap';

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
      <section>List of navigation mene items</section>
      <div>
        <h2>Welcome, @{user?.attributes?.user_name}</h2>
      </div>
      <Button
        onClick={handleLogout}
        variant="outline-secondary"
        className="rounded-pill"
      >
        Log Out
      </Button>
    </Col>
  );
};

export default LeftSideBar;
