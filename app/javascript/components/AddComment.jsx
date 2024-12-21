import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { getCSRFToken } from '../utils';

const AddComment = ({ tweetId, onCommentAdded }) => {
  const [commentData, setCommentData] = useState({ body: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const commentLength = commentData.body.length;

  const handleInputChange = (event) => {
    setCommentData({ ...commentData, body: event.target.value });
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (commentLength === 0) {
      setErrorMessage('Comment cannot be empty.');
      return;
    }
    if (commentLength > 255) {
      setErrorMessage('Comment cannot exceed 255 characters.');
      return;
    }

    const csrfToken = getCSRFToken();
    try {
      const response = await fetch('/api/v1/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ ...commentData, tweet_id: tweetId }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setCommentData({ body: '' });
        setErrorMessage('');
        onCommentAdded(newComment.data);
      } else if (response.status === 401) {
        window.location.href = '/users/sign_in';
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.message || 'Failed to post comment.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <Card className="p-3 mb-3 shadow-sm card-black border border-primary rounded w-75">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Post your reply"
            className="tweet-textarea bg-secondary"
            onChange={handleInputChange}
            value={commentData.body}
          />
          {errorMessage && (
            <p className="text-danger small mt-2">{errorMessage}</p>
          )}
        </Form.Group>
        <Row>
          <Col
            className={`text-start ${
              commentLength > 255 ? 'text-danger' : 'text-secondary'
            }`}
          >
            {commentLength}/255
          </Col>
          <Col className="text-end">
            <Button
              variant="primary"
              className="rounded-pill px-4"
              type="submit"
              disabled={commentLength === 0 || commentLength > 255}
            >
              Reply
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddComment;
