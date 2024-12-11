import React from 'react';
import { Container, Row } from 'react-bootstrap';
import LeftSidebar from '../LeftSideBar';
import MainContent from '../MainContent';
import RightSidebar from '../RightSidebar';

const Home = () => {
  return (
    <Container fluid>
      <Row>
        <LeftSidebar />
        <MainContent />
        <RightSidebar />
      </Row>
    </Container>
  );
};

export default Home;
