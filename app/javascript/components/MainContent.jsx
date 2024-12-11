import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import Tweet from './Tweet';

const MainContent = () => {
  const [tweets, setTweets] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await fetch('http://localhost:3000/api/v1/tweets');
      const tweetData = await response.json();
      setTweets(tweetData.data);
      setAuthors(tweetData.included);
    };
    fetchTweets();
  }, []);

  console.log(tweets);
  console.log(authors);
  return (
    <Col className="border-end border-start border-secondary h-100">
      {tweets.map((tweet) => {
        const author = authors.find(
          (author) => author.id === tweet.relationships.user.data.id
        );

        const authorName = author?.attributes?.user_name;

        return (
          <Tweet
            key={tweet.id}
            content={tweet.attributes.content}
            author={authorName}
          />
        );
      })}
    </Col>
  );
};

export default MainContent;
