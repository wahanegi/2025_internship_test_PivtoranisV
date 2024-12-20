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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const csrfToken = getCSRFToken();
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
      onUpdateComment(updatedComment.data);
      handleClose();
    } else if (response.status === 401) {
      alert('You are not authorized to edit this comment.');
    } else {
      alert('Failed to edit the comment. Please try again.');
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
              onChange={(e) => setUpdatedBody(e.target.value)}
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

export default EditComment;
