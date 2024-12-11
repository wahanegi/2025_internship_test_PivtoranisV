import React from 'react';
import { Container, Row } from 'react-bootstrap';
import MainContent from '../MainContent';
import LeftSideBar from '../LeftSideBar';
import RightSideBar from '../RightSideBar';

const Home = () => {
  return (
    <Container fluid className="my-2">
      <Row className="gap-2">
        <LeftSideBar />
        <MainContent />
        <RightSideBar />
      </Row>
    </Container>
  );
};

export default Home;
