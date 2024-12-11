import React from 'react';

const Tweet = ({ content, author }) => {
  return (
    <section>
      <div className="py-2 border-bottom border-secondary">
        <p>{author}</p>
        <p>{content}</p>
      </div>
    </section>
  );
};

export default Tweet;
