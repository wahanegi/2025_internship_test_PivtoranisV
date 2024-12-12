import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

const AddTweet = ({ user }) => {
  const [tweetData, setTweetData] = useState({ content: '' });

  const handleInputChange = (event) => {
    setTweetData({ ...tweetData, content: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');
    const response = await fetch('http://localhost:3000/api/v1/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ tweet: tweetData }),
    });

    if (response.status === 401) {
      window.location.href = '/users/sign_in';
      return;
    }
    const newTweet = await response.json();

    setTweetData({ content: '' });
  };

  return (
    <>
      {user && (
        <Card className="p-3 mb-3 shadow-sm card-black border border-secondary rounded">
          <div className="d-flex align-items-center mb-3">
            <span className="fw-bold text-primary">
              @{user.attributes.user_name}
            </span>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="What is happening?!"
                value={tweetData.content}
                onChange={handleInputChange}
                className="tweet-textarea bg-secondary"
              />
            </Form.Group>
            <Row>
              <Col className="text-end">
                <Button
                  variant="primary"
                  className="rounded-pill px-4"
                  type="submit"
                  disabled={!tweetData.content.trim()}
                >
                  Post
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      )}
    </>
  );
};

export default AddTweet;
