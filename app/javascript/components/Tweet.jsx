import React from 'react';

const Tweet = ({ content, author, date }) => {
  const time = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section>
      <div className="py-2 border-bottom border-secondary">
        <p>{author}</p>
        <p>{time}</p>
        <p>{content}</p>
      </div>
    </section>
  );
};

export default Tweet;
