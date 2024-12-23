import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { getCSRFToken } from '../utils';
import { useParams, useNavigate } from 'react-router-dom';

const EditTweet = ({ show, handleClose, content }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updatedContent, setUpdatedContent] = useState(content);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const csrfToken = getCSRFToken();

    try {
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
      } else if (response.status === 422) {
        const error = await response.json();
        setErrorMessage(error.errors[0]);
      } else if (response.status === 401) {
        setErrorMessage('You are not authorized to edit this tweet.');
      } else {
        setErrorMessage('Failed to edit the tweet. Please try again.');
      }
    } catch (error) {
      console.error('Error updating tweet:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const tweetLength = updatedContent.length;

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
              onChange={(e) => {
                setUpdatedContent(e.target.value);
                setErrorMessage('');
              }}
            />
            {errorMessage && (
              <p className="text-danger small mt-2">{errorMessage}</p>
            )}
          </Form.Group>
          <Row className="align-items-center">
            <Col
              className={`text-start ${
                tweetLength > 255 ? 'text-danger' : 'text-light'
              }`}
            >
              {tweetLength}/255
            </Col>
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
                disabled={tweetLength > 255}
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
