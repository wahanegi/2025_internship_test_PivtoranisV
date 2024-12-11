import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import Suggestions from './Suggestions';
import UserAuthentication from './UserAuthentication';

const RightSideBar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <Col xs={4} className="h-100">
      {currentUser ? <Suggestions /> : <UserAuthentication />}
    </Col>
  );
};

export default RightSideBar;
