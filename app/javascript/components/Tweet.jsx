import React from 'react';
import {
  formatDistanceToNow,
  parseISO,
  differenceInDays,
  format,
} from 'date-fns';
import TweetActionLinks from './TweetActionLinks';
import { useNavigate } from 'react-router-dom';

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
}) => {
  const navigate = useNavigate();

  const parsedDate = parseISO(date);
  const daysDifference = differenceInDays(new Date(), parsedDate);

  const displayTime =
    daysDifference <= 1
      ? formatDistanceToNow(parsedDate, { addSuffix: true })
      : format(parsedDate, 'MMM dd, yy');

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
        />
      </div>
    </section>
  );
};

export default Tweet;
