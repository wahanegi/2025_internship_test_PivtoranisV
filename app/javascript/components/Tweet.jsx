import React from 'react';
import {
  formatDistanceToNow,
  parseISO,
  differenceInDays,
  format,
} from 'date-fns';

const Tweet = ({ content, author, date }) => {
  const parsedDate = parseISO(date);
  const daysDifference = differenceInDays(new Date(), parsedDate);

  const displayTime =
    daysDifference <= 1
      ? formatDistanceToNow(parsedDate, { addSuffix: true })
      : format(parsedDate, 'MMM dd, yy');

  return (
    <section className="tweet border border-secondary py-3 px-3 card-black my-3">
      <div>
        <p className="mb-1 text-secondary small">
          <span className="fw-bolder fs-6">@{author}</span> · {displayTime}
        </p>
        <p className="mb-0 lh-lg">{content}</p>
      </div>
    </section>
  );
};

export default Tweet;
