import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import MainContent from '../MainContent';
import LeftSidebar from '../LeftSidebar';
import RightSidebar from '../RightSidebar';

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [likedTweets, setLikedTweets] = useState([]);
  useEffect(() => {
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

    fetchCurrentUser();
  }, []);

  return (
    <Container fluid className="vh-100 my-2">
      <Row className="h-100 gap-2">
        <LeftSidebar user={currentUser} />
        <MainContent
          user={currentUser}
          likedTweets={likedTweets}
          setLikedTweets={setLikedTweets}
        />
        <RightSidebar user={currentUser} />
      </Row>
    </Container>
  );
};

export default Home;
