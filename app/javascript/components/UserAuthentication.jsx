import React from 'react';
import { Button, Card } from 'react-bootstrap';

const UserAuthentication = () => {
  return (
    <Card
      style={{ maxWidth: '22rem' }}
      className="card-black border border-secondary"
    >
      <Card.Body>
        <Card.Title className="my-2">New to Tweeter?</Card.Title>
        <Card.Subtitle className="mb-4 text-secondary mt-4 small">
          Sign up now to get your own timeline
        </Card.Subtitle>
        <div className="d-flex flex-column gap-3">
          <Button
            href="/users/sign_up"
            variant="light"
            className="rounded-pill"
          >
            Create Account
          </Button>
          <Button
            href="/users/sign_in"
            variant="outline-secondary"
            className="rounded-pill"
          >
            Sign in
          </Button>
        </div>
        <Card.Text className="small text-secondary mt-4">
          By signing up, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserAuthentication;
