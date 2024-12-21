import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { getCSRFToken } from '../utils';

const AddTweet = ({ user, addTweet }) => {
  const [tweetData, setTweetData] = useState({ content: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    setTweetData({ ...tweetData, content: event.target.value });
    setErrorMessage('');
  };

  const tweetLength = tweetData.content.length;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const csrfToken = getCSRFToken();

    try {
      const response = await fetch('/api/v1/tweets', {
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

      if (response.status === 422) {
        const error = await response.json();
        console.error('Error posting tweet:', error.errors[0]);
        setErrorMessage(error.errors[0]);
        return;
      }

      const newTweet = await response.json();
      addTweet(newTweet);
      setTweetData({ content: '' });
    } catch (err) {
      console.error('Error posting tweet:', err);
      setErrorMessage('Something went wrong. Please try again.');
    }
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
              {errorMessage && (
                <p className="text-danger small mt-2">{errorMessage}</p>
              )}
            </Form.Group>
            <Row className="align-items-center">
              <Col
                className={`text-start ${
                  tweetLength > 255 ? 'text-danger' : 'text-secondary'
                }`}
              >
                {tweetLength}/255
              </Col>
              <Col className="text-end">
                <Button
                  variant="primary"
                  className="rounded-pill px-4"
                  type="submit"
                  disabled={!tweetData.content.trim() || tweetLength > 255}
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
