import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';

const MainContent = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await fetch('http://localhost:3000/api/v1/tweets');
      const tweetData = await response.json();
      setTweets(tweetData.data);
    };
    fetchTweets();
  }, []);

  console.log(tweets);
  return (
    <Col className="border-end  border-secondary vh-100">
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id}>{tweet.attributes.content}</li>
        ))}
      </ul>
    </Col>
  );
};

export default MainContent;
