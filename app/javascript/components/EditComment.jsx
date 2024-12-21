import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { getCSRFToken } from '../utils';

const EditComment = ({
  show,
  handleClose,
  body,
  commentId,
  onUpdateComment,
}) => {
  const [updatedBody, setUpdatedBody] = useState(body);
  const [errorMessage, setErrorMessage] = useState('');
  const commentLength = updatedBody.length;

  const handleInputChange = (event) => {
    setUpdatedBody(event.target.value);
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
      const response = await fetch(`/api/v1/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ comment: { body: updatedBody } }),
      });

      if (response.ok) {
        const updatedComment = await response.json();
        setErrorMessage('');
        handleClose();
        onUpdateComment(updatedComment.data);
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.message || 'Failed to update comment.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
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
              value={updatedBody || ''}
              onChange={handleInputChange}
            />
            {errorMessage && (
              <p className="text-danger small mt-2">{errorMessage}</p>
            )}
          </Form.Group>
          <Row>
            <Col
              className={`text-start ${
                commentLength > 255 ? 'text-danger' : 'text-light'
              }`}
            >
              {commentLength}/255
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
                disabled={commentLength === 0 || commentLength > 255}
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

export default EditComment;
