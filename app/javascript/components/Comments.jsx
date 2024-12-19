import React from 'react';

const Comments = () => {
  return (
    <section className="border border-primary py-3 px-3 my-3 w-75">
      <div>
        <p className="mb-1 text-secondary small">
          <span className="fw-bolder fs-6">@Author</span> · Time
        </p>
        <p className="mb-0 lh-lg">Body</p>
      </div>
    </section>
  );
};
export default Comments;
