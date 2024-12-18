import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { getCSRFToken } from '../utils';
import { useParams, useNavigate } from 'react-router-dom';

const EditTweet = ({ show, handleClose, content }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updatedContent, setUpdatedContent] = useState(content);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const csrfToken = getCSRFToken();
    const response = await fetch(`/api/v1/tweets/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ tweet: { content: updatedContent } }),
    });

    if (response.ok) {
      handleClose();
      navigate(`/`);
    } else if (response.status === 401) {
      alert('You are not authorized to edit this tweet.');
    } else {
      alert('Failed to edit the tweet. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              className="tweet-textarea"
              value={updatedContent || ''}
              onChange={(e) => setUpdatedContent(e.target.value)}
            />
          </Form.Group>
          <Row>
            <Col className="text-end">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="rounded-pill px-4"
              >
                Close
              </Button>
              <Button
                variant="primary"
                className="rounded-pill px-4"
                type="submit"
              >
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTweet;
