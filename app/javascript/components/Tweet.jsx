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
    <section>
      <div className="py-2 border-bottom border-secondary">
        <p>{author}</p>
        <p>{displayTime}</p>
        <p>{content}</p>
      </div>
    </section>
  );
};

export default Tweet;
