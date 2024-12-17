import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import Tweet from './Tweet';
import AddTweet from './AddTweet';

const MainContent = ({ user }) => {
  const [tweets, setTweets] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await fetch(`/api/v1/tweets`);
      const tweetData = await response.json();
      setTweets(tweetData.data);
      setAuthors(tweetData.included);
    };
    const fetchLikes = async () => {
      const response = await fetch(`/api/v1/likes`);
      const likesData = await response.json();
      setLikes(likesData);
    };
    fetchTweets();
    fetchLikes();
  }, []);

  const addTweet = (newTweet) => {
    const normalizedTweet = newTweet.data;
    setTweets([normalizedTweet, ...tweets]);
  };

  const getLikeCount = (tweetId) => {
    return likes[tweetId] || 0;
  };

  return (
    <Col className="border-end border-start border-secondary h-100 overflow-auto">
      <AddTweet user={user} addTweet={addTweet} />
      {tweets.map((tweet) => {
        const author = authors.find(
          (author) => author.id === tweet.relationships.user.data.id
        );

        const authorName = author?.attributes?.user_name;
        const likeCount = getLikeCount(tweet.id);

        return (
          <Tweet
            key={tweet.id}
            content={tweet.attributes.content}
            author={authorName}
            date={tweet.attributes.created_at}
            likes={likeCount}
            tweetId={tweet.id}
          />
        );
      })}
    </Col>
  );
};

export default MainContent;
