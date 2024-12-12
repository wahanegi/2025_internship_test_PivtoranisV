import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import MainContent from '../MainContent';
import LeftSideBar from '../LeftSideBar';
import RightSideBar from '../RightSideBar';

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/users', {
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setCurrentUser(null);
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        } else {
          const userData = await response.json();
          setCurrentUser(userData.data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <Container fluid className="my-2">
      <Row className="gap-2">
        <LeftSideBar user={currentUser} />
        <MainContent />
        <RightSideBar user={currentUser} />
      </Row>
    </Container>
  );
};

export default Home;
