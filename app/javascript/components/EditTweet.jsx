import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

const EditTweet = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control as="textarea" rows={3} className="tweet-textarea" />
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
