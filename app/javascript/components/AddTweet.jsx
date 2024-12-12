import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

const AddTweet = () => {
  const [tweetData, setTweetData] = useState({ content: '' });

  const handleInputChange = (event) => {
    setTweetData({ ...tweetData, content: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');
    const response = await fetch('http://localhost:3000/api/v1/tweets', {
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
    const newTweet = await response.json();

    setTweetData({ content: '' });
  };

  return (
    <Card className="card-black border border-secondary">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="What is happening?!"
            value={tweetData.content}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="light" className="rounded-pill" type="submit">
          Post
        </Button>
      </Form>
    </Card>
  );
};

export default AddTweet;
