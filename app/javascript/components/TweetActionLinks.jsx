import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';

const TweetActionLinks = ({ likes, tweetId }) => {
  const handleClick = async () => {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');
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
  };
  return (
    <div className="d-flex justify-content-evenly">
      <div className="d-flex align-items-center gap-1 action-links-hover p-1 rounded">
        <button
          onClick={handleClick}
          type="button"
          className="btn d-flex align-items-center gap-1 action-links-hover "
        >
          <FaRegHeart /> <span>{likes}</span>
        </button>
      </div>
      <button
        type="button"
        className="btn d-flex align-items-center gap-1 action-links-hover "
      >
        <FiMessageCircle /> <span>15</span>
      </button>
    </div>
  );
};

export default TweetActionLinks;
