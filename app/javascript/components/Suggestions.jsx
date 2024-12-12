import React from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

const Suggestions = () => {
  return (
    <>
      <Form className="my-2">
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className="mr-sm-2 bg-secondary border-0"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" variant="primary" className="rounded-pill">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <Card className="card-black border border-secondary me-5">
        <Card.Body>
          <Card.Title className="my-2">What’s happening</Card.Title>
          <Card.Subtitle className="text-secondary mt-4 small">
            Technology · Trending
          </Card.Subtitle>
          <Card.Text>
            Apple Intelligence
            <br />
            <span className="text-secondary small my-0">8,758 posts</span>
          </Card.Text>
          <Card.Subtitle className="text-secondary mt-4 small">
            Trending in Ukraine
          </Card.Subtitle>
          <Card.Text>
            Patriot
            <br />
            <span className="text-secondary small my-0">85,458 posts</span>
          </Card.Text>
          <Card.Subtitle className="text-secondary mt-4 small">
            Business & finance · Trending
          </Card.Subtitle>
          <Card.Text>
            $GOOGL
            <br />
            <span className="text-secondary small my-0">5,345 posts</span>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="card-black border border-secondary mt-5 me-5">
        <Card.Body>
          <Card.Title className="my-2">Who to follow</Card.Title>
          <Card.Subtitle className="text-secondary mt-4 small">
            @Bob
          </Card.Subtitle>
          <Card.Text>Follow</Card.Text>
          <Card.Subtitle className="text-secondary mt-4 small">
            @Sam
          </Card.Subtitle>
          <Card.Text>Follow</Card.Text>
          <Card.Subtitle className="text-secondary mt-4 small">
            @Goldie
          </Card.Subtitle>
          <Card.Text>Follow</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Suggestions;
