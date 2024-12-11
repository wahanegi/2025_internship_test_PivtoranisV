import React from 'react';

const Tweet = ({ content, author, date }) => {
  return (
    <section>
      <div className="py-2 border-bottom border-secondary">
        <p>{author}</p>
        <p>{date}</p>
        <p>{content}</p>
      </div>
    </section>
  );
};

export default Tweet;
