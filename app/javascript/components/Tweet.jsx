import React from 'react';

const Tweet = ({ content }) => {
  return (
    <section>
      <div className="py-2 border-bottom border-secondary">
        <p>{content}</p>
      </div>
    </section>
  );
};

export default Tweet;
