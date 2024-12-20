import React from 'react';
import TweetActionLinks from './TweetActionLinks';
import { useNavigate } from 'react-router-dom';
import { getDisplayTime } from '../utils';

const Tweet = ({
  content,
  author,
  date,
  likes,
  tweetId,
  addLikes,
  isLiked,
  likeId,
  removeLikes,
  sentFromDetails = false,
  currentUser,
  authorId,
  totalReply,
}) => {
  const navigate = useNavigate();

  const displayTime = getDisplayTime(date);

  const handleNavigate = () => {
    if (!sentFromDetails) {
      navigate(`/tweets/${tweetId}`);
    }
  };

  return (
    <section
      className={`border border-secondary py-3 px-3 card-black my-3 ${
        sentFromDetails ? '' : 'custom-hover'
      }`}
      onClick={handleNavigate}
    >
      <div>
        <p className="mb-1 text-secondary small">
          <span className="fw-bolder fs-6">@{author}</span> · {displayTime}
        </p>
        <p className="mb-0 lh-lg">{content}</p>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${sentFromDetails ? 'w-100' : 'w-50'}`}
      >
        <TweetActionLinks
          likes={likes}
          tweetId={tweetId}
          addLikes={addLikes}
          isLiked={isLiked}
          likeId={likeId}
          removeLikes={removeLikes}
          sentFromDetails={sentFromDetails}
          currentUser={currentUser}
          authorId={authorId}
          content={content}
          totalReply={totalReply}
        />
      </div>
    </section>
  );
};

export default Tweet;
