import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LeftSidebar from '../LeftSidebar';
import { Col, Container, Row } from 'react-bootstrap';
import Tweet from '../Tweet';
import Comments from '../Comments';

const TweetDetails = () => {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [tweet, setTweet] = useState(null);
  const [author, setAuthor] = useState(null);
  const [likes, setLikes] = useState({});
  const [likedTweets, setLikedTweets] = useState([]);

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
          setLikedTweets(userData.data.attributes.liked_tweets_with_ids);
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

  const likedTweet = likedTweets.find(
    (likedTweet) => likedTweet.tweet_id === Number(id)
  );

  const likeId = likedTweet ? likedTweet.like_id : null;

  const addLikes = (tweetId, newLikeId) => {
    setLikedTweets((prevLikedTweets) => {
      const isAlreadyLiked = prevLikedTweets.some(
        (likedTweet) => likedTweet.tweet_id === tweetId
      );
      if (isAlreadyLiked) return prevLikedTweets;

      return [...prevLikedTweets, { tweet_id: tweetId, like_id: newLikeId }];
    });

    setLikes((prevLikes) => {
      const currentLikes = prevLikes[tweetId] || 0;
      return { ...prevLikes, [tweetId]: currentLikes + 1 };
    });
  };

  const removeLikes = (tweetId) => {
    setLikedTweets((prevLikedTweets) => {
      const isAlreadyUnliked = !prevLikedTweets.some(
        (likedTweet) => likedTweet.tweet_id === tweetId
      );
      if (isAlreadyUnliked) return prevLikedTweets;

      return prevLikedTweets.filter(
        (likedTweet) => likedTweet.tweet_id !== tweetId
      );
    });

    setLikes((prevLikes) => {
      const currentLikes = prevLikes[tweetId] || 0;
      return { ...prevLikes, [tweetId]: Math.max(currentLikes - 1, 0) };
    });
  };

  return (
    <Container fluid className="vh-100 my-2">
      <Row className="h-100 gap-2">
        <LeftSidebar user={currentUser} />
        <Col>
          {tweet && author && (
            <>
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
              <Row>
                <Col className="d-flex justify-content-center">
                  <p>Post your reply</p>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex flex-column align-items-center">
                  <Comments />
                  <Comments />
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TweetDetails;
