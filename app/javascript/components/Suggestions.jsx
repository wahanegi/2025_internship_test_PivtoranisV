import React from 'react';
import { Card, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const Suggestions = () => {
  return (
    <>
      <Form className="my-2 me-5">
        <InputGroup className="bg-secondary rounded">
          <InputGroup.Text className="bg-secondary border-0">
            <FaSearch className="text-dark" />
          </InputGroup.Text>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2 bg-secondary border-0 search"
          />
        </InputGroup>
      </Form>
      <Card className="card-black border border-secondary me-5 mt-5">
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
      <Card className="card-black border border-secondary mt-2 me-5">
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
      <p className="text-secondary small mt-5">
        Terms of Service · Privacy Policy · Cookie Policy · Accessibility
      </p>
      <p className="text-secondary small text-center me-5">
        &copy; 2024 PivtoranisV
      </p>
    </>
  );
};

export default Suggestions;
