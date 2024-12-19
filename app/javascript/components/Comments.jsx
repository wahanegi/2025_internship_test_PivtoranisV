import React from 'react';
import { getDisplayTime } from '../utils';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const Comments = ({ comments, currentUser }) => {
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
            {currentUser?.id === comment.relationships.user.data.id && (
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn d-flex align-items-center gap-1 action-links-hover"
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  className="btn d-flex align-items-center gap-1 action-links-hover"
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </section>
        );
      })}
    </>
  );
};

export default Comments;
