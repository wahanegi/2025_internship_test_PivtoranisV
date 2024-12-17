import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';

const TweetActionLinks = ({ likes }) => {
  return (
    <div className="d-flex justify-content-evenly">
      <div className="d-flex align-items-center gap-1 action-links-hover p-1 rounded">
        <button
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
