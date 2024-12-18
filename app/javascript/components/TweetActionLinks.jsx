import React, { useState } from 'react';
import { FaRegHeart, FaHeart, FaEdit } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import EditTweet from './EditTweet';
import { getCSRFToken } from '../utils';

const TweetActionLinks = ({
  likes,
  tweetId,
  addLikes,
  isLiked,
  likeId,
  removeLikes,
  sentFromDetails,
  currentUser,
  authorId,
}) => {
  const [tweetLiked, setTweetLiked] = useState(isLiked);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this tweet?')) return;
    const csrfToken = getCSRFToken();

    const response = await fetch(`/api/v1/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
    });

    if (response.ok) {
      window.location.href = '/';
    } else if (response.status === 401) {
      alert('You are not authorized to delete this tweet.');
    } else {
      alert('Failed to delete the tweet. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-between">
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

        <button
          type="button"
          className="btn d-flex align-items-center gap-1 action-links-hover"
        >
          <FiMessageCircle /> <span>15</span>
        </button>
      </div>
      <div className="d-flex align-items-center gap-1 action-links-hover p-1 rounded">
        {sentFromDetails && currentUser.id === authorId && (
          <>
            <button
              type="button"
              className="btn d-flex align-items-center gap-1 action-links-hover"
              onClick={() => setShowEditModal(true)}
            >
              <FaEdit />
            </button>
            <button
              type="button"
              className="btn d-flex align-items-center gap-1 action-links-hover"
              onClick={handleDelete}
            >
              <MdDelete />
            </button>
          </>
        )}
      </div>
      <EditTweet
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
      />
    </div>
  );
};

export default TweetActionLinks;
