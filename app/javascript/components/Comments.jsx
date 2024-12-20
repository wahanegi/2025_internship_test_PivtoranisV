import React, { useState } from 'react';
import { getCSRFToken, getDisplayTime } from '../utils';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import EditComment from './EditComment';

const Comments = ({ comments, currentUser, onDeleteComment, setComments }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState(null);

  const handleDelete = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete your comment?'))
      return;
    const csrfToken = getCSRFToken();

    const response = await fetch(`/api/v1/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
    });

    if (response.ok) {
      onDeleteComment(commentId);
    } else if (response.status === 401) {
      alert('You are not authorized to delete this comment.');
    } else {
      alert('Failed to delete the comment. Please try again.');
    }
  };

  const handleEdit = (comment) => {
    setCommentToEdit(comment);
    setShowEditModal(true);
  };

  const onUpdateComment = (updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === updatedComment.id
          ? { ...comment, attributes: updatedComment.attributes }
          : comment
      )
    );
    setCommentToEdit(null);
    setShowEditModal(false);
  };

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
                  onClick={() => handleEdit(comment)}
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  className="btn d-flex align-items-center gap-1 action-links-hover"
                  onClick={() => handleDelete(comment.id)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </section>
        );
      })}
      {commentToEdit && (
        <EditComment
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          body={commentToEdit?.attributes.body}
          commentId={commentToEdit.id}
          onUpdateComment={onUpdateComment}
        />
      )}
    </>
  );
};

export default Comments;
