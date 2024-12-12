import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import Suggestions from './Suggestions';
import UserAuthentication from './UserAuthentication';

const RightSideBar = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch('http://localhost:3000/api/v1/users');
      const tweetData = await response.json();
      setCurrentUser(tweetData.data);
    };
    fetchCurrentUser();
  }, []);

  console.log(currentUser);
  return (
    <Col xs={4} className="h-100">
      {currentUser ? <Suggestions /> : <UserAuthentication />}
    </Col>
  );
};

export default RightSideBar;
