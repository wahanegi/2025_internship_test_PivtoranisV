import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { getCSRFToken } from '../utils';

const TweetActionLinks = ({
  likes,
  tweetId,
  addLikes,
  isLiked,
  likeId,
  removeLikes,
}) => {
  const [tweetLiked, setTweetLiked] = useState(isLiked);

  const handleLikeClick = async () => {
    const csrfToken = getCSRFToken();

    const response = await fetch('/api/v1/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ tweet_id: tweetId }),
    });

    if (response.status === 401) {
      window.location.href = '/users/sign_in';
      return;
    }
    const newLike = await response.json();
    addLikes(newLike.tweet_id);
    setTweetLiked(true);
  };

  const handleUnlikeClick = async () => {
    const csrfToken = getCSRFToken();

    const response = await fetch(`/api/v1/likes/${likeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
    });
    setTweetLiked(false);
    removeLikes(tweetId);
  };
  return (
    <div className="d-flex justify-content-start">
      <div className="d-flex align-items-center gap-1 action-links-hover p-1 rounded">
        {tweetLiked ? (
          <button
            onClick={handleUnlikeClick}
            type="button"
            className="btn d-flex align-items-center gap-1 action-links-hover text-danger"
          >
            <FaHeart /> <span>{likes}</span>
          </button>
        ) : (
          <button
            onClick={handleLikeClick}
            type="button"
            className="btn d-flex align-items-center gap-1 action-links-hover"
          >
            <FaRegHeart /> <span>{likes}</span>
          </button>
        )}
      </div>
      <button
        type="button"
        className="btn d-flex align-items-center gap-1 action-links-hover"
      >
        <FiMessageCircle /> <span>15</span>
      </button>
    </div>
  );
};

export default TweetActionLinks;
