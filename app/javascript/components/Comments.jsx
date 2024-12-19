import React, { useState, useEffect } from 'react';
import { getDisplayTime } from '../utils';

const Comments = ({ tweetId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/v1/tweets/${tweetId}/comments`);
      const commentsData = await response.json();
      setComments(commentsData.data);
    };
    fetchComments();
  }, []);

  return (
    <>
      {comments.map((comment) => {
        const displayTime = getDisplayTime(comment?.attributes.created_at);
        return (
          <section
            className="border border-primary py-3 px-3 my-3 w-75"
            key={comment.id}
          >
            <div>
              <p className="mb-1 text-secondary small">
                <span className="fw-bolder fs-6">
                  @{comment?.attributes.user_name}
                </span>{' '}
                · {displayTime}
              </p>
              <p className="mb-0 lh-lg">{comment?.attributes.body}</p>
            </div>
          </section>
        );
      })}
    </>
  );
};
export default Comments;
