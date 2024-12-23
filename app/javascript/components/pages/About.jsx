import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import LeftSidebar from '../LeftSidebar';

const About = () => {
  return (
    <Container fluid className="vh-100 my-2">
      <Row className="h-100 gap-2">
        <LeftSidebar />
        <Col className="col-8 my-2">
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="text-center">
                About This Application
              </Card.Title>
              <Card.Text className="text-secondary">
                Welcome to Twitter clone! This application is built with modern
                web development tools, including:
              </Card.Text>
              <Card.Text>
                <ul>
                  <li>
                    <span className="fw-bold">Frontend:</span> React with
                    Bootstrap for responsive styling.
                  </li>
                  <li>
                    <span className="fw-bold">Backend:</span> Ruby on Rails for
                    APIs and data management.
                  </li>
                  <li>
                    <span className="fw-bold">Database:</span> PostgreSQL for
                    reliable data storage.
                  </li>
                </ul>
              </Card.Text>
              <Card.Text className="text-secondary">
                This application replicates core Twitter functionalities,
                allowing users to:
              </Card.Text>
              <Card.Text>
                <ul>
                  <li>
                    <span className="fw-bold">Sign Up and Log In: </span>
                    Users can create accounts and securely log in with
                    authentication managed by Devise.
                  </li>
                  <li>
                    <span className="fw-bold">Verify Accounts: </span>
                    Confirm email addresses via a verification link for secure
                    account activation.
                  </li>
                  <li>
                    <span className="fw-bold">Post Tweets:</span> Share your
                    thoughts with the world by creating tweets that are
                    displayed in real-time.
                  </li>
                  <li>
                    <span className="fw-bold">Like Tweets:</span> Engage with
                    tweets by liking them. The like count updates dynamically.
                  </li>
                  <li>
                    <span className="fw-bold">Comment on Tweets: </span>
                    Participate in discussions by commenting on tweets.
                  </li>
                  <li>
                    <span className="fw-bold">Edit and Delete:</span> Modify or
                    remove your tweets and comments to keep your content
                    up-to-date.
                  </li>
                  <li>
                    <span className="fw-bold">Real-Time Updates:</span> See your
                    tweets, likes, and comments reflected immediately after any
                    action.
                  </li>
                </ul>
              </Card.Text>
              <Card.Text className="text-secondary">
                This project serves as a learning experience, combining React
                for a dynamic user interface and Ruby on Rails for robust
                backend support.
              </Card.Text>
              <Card.Text>
                Thank you for exploring this Twitter clone. I hope you enjoy
                using it as much as I enjoyed building it!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
