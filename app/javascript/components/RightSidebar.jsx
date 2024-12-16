import React from 'react';
import { Col } from 'react-bootstrap';
import Suggestions from './Suggestions';
import UserAuthentication from './UserAuthentication';

const RightSidebar = ({ user }) => {
  return (
    <Col className="h-100 col-4">
      {user ? <Suggestions /> : <UserAuthentication />}
    </Col>
  );
};

export default RightSidebar;
