import React from 'react';
import { Col } from 'react-bootstrap';
import Suggestions from './Suggestions';
import UserAuthentication from './UserAuthentication';

const RightSideBar = ({ user }) => {
  return (
    <Col xs={4} className="h-100">
      {user ? <Suggestions /> : <UserAuthentication />}
    </Col>
  );
};

export default RightSideBar;
