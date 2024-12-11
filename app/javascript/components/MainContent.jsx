import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import Tweet from './Tweet';

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
    <Col className="border-end border-start border-secondary h-100">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} content={tweet.attributes.content} />
      ))}
    </Col>
  );
};

export default MainContent;
