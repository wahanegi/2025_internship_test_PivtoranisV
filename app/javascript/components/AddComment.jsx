import React from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

const AddComment = () => {
  return (
    <Card className="p-3 mb-3 shadow-sm card-black border border-primary rounded w-75">
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Post your reply"
            className="tweet-textarea bg-secondary"
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
