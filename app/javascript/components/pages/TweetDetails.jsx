import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LeftSidebar from '../LeftSidebar';
import { Col, Container, Row } from 'react-bootstrap';
import Tweet from '../Tweet';

const TweetDetails = () => {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [tweet, setTweet] = useState(null);
  const [author, setAuthor] = useState(null);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const fetchTweet = async () => {
      const response = await fetch(`/api/v1/tweets/${id}`);
      const tweetData = await response.json();
      setTweet(tweetData.data);
      const authorData = tweetData.included.find(
        (include) => include.type === 'user'
      );
      setAuthor(authorData);
    };
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('/api/v1/users', {
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setCurrentUser(null);
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        } else {
          const userData = await response.json();
          setCurrentUser(userData.data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    const fetchLikes = async () => {
      const response = await fetch(`/api/v1/likes`);
      const likesData = await response.json();
      setLikes(likesData);
    };
    fetchCurrentUser();
    fetchTweet();
    fetchLikes();
  }, []);

  const likeCount = likes[id] || 0;
  const likedTweets = currentUser?.attributes?.liked_tweets_with_ids || [];
  const likedTweet = likedTweets.find(
    (likedTweet) => likedTweet.tweet_id === Number(id)
  );

  const likeId = likedTweet ? likedTweet.like_id : null;

  const addLikes = (tweetId) => {
    setLikes((prevLikes) => {
      const currentLikes = prevLikes[tweetId] || 0;

      return { ...prevLikes, [tweetId]: currentLikes + 1 };
    });
  };

  const removeLikes = (tweetId) => {
    setLikes((prevLikes) => {
      const currentLikes = prevLikes[tweetId] || 0;

      return { ...prevLikes, [tweetId]: currentLikes - 1 };
    });
  };
  return (
    <Container fluid className="vh-100 my-2">
      <Row className="h-100 gap-2">
        <LeftSidebar user={currentUser} />
        <Col>
          {tweet && author && (
            <Tweet
              content={tweet.attributes.content}
              author={author.attributes.user_name}
              date={tweet.attributes.created_at}
              likes={likeCount}
              tweetId={id}
              addLikes={addLikes}
              removeLikes={removeLikes}
              isLiked={likeId !== null}
              likeId={likeId}
              sentFromDetails={true}
              currentUser={currentUser}
              authorId={author.id}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TweetDetails;
