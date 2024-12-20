import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { getCSRFToken } from '../utils';

const AddComment = ({ tweetId, onCommentAdded }) => {
  const [commentData, setCommentData] = useState({ body: '' });

  const handleInputChange = (event) => {
    setCommentData({ ...commentData, body: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const csrfToken = getCSRFToken();
    const response = await fetch('/api/v1/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ ...commentData, tweet_id: tweetId }),
    });

    if (response.status === 401) {
      window.location.href = '/users/sign_in';
      return;
    }

    const newComment = await response.json();
    setCommentData({ body: '' });

    onCommentAdded(newComment.data);
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
        </Form.Group>
        <Row>
          <Col className="text-end">
            <Button
              variant="primary"
              className="rounded-pill px-4"
              type="submit"
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
