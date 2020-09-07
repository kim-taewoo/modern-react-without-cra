import React, { useEffect, useCallback } from 'react';
import classnames from 'classnames';
import Datetime from '@/components/Datetime';
import CommentList from '@/components/CommentList';
import CommentForm from '@/components/CommentForm';
import { useHistory } from 'react-router-dom';

const Post = (props) => {
  const { post, comments = [], getComments, onLikePost, onCommentSubmit } = props;
  const { id, createdAt, writer, contents, likes, likesOfMe } = post;
  const likeHandler = useCallback(() => void onLikePost(id), [onLikePost, id]);
  const history = useHistory();

  // 포스트별 코멘트 가져오기
  useEffect(() => void getComments(id), [id]);

  return (
    <div className="card">
      <div className="card-body">
        <a onClick={() => history.push(`u/${writer.id}`)}>
          <h5 className="card-title">{writer.name}</h5>
        </a>

        <h6 className="card-subtitle text-muted">
          <Datetime time={createdAt} />
        </h6>
        <p className="card-text">{contents}</p>
        <hr />
        <div className="card-info">
          <button type="button" className="thumb-count" onClick={likeHandler}>
            <i className={classnames('far fa-thumbs-up', { on: likesOfMe })} /> {likes} 개
          </button>
          <span className="comment-count">
            <i className="far fa-comment-alt" /> {comments.length} 개
          </span>
        </div>
      </div>
      <CommentList comments={comments} />
      <CommentForm postId={id} onCommentSubmit={onCommentSubmit} />
      <style jsx global>{`
        .card {
          padding: 0;
          margin-top: 50px;
          border: none;
          border-radius: 0.5rem;
        }
        .card-title {
          cursor: pointer;
        }
        .card-title:hover {
          opacity: 0.7;
        }
        .card .card-body {
          padding: 40px;
        }
        .card .card-text {
          padding-top: 20px;
          white-space: pre-wrap;
        }
        .card .card-info {
          height: 20px;
        }
        .card .card-info .thumb-count,
        .card .card-info .comment-count {
          display: inline-block;
          margin-right: 24px;
          vertical-align: middle;
          font-size: 12px;
          cursor: pointer;
          padding: 0;
          border: none;
          background-color: transparent;
          transition: color ease-in-out 0.3s;
          transition: margin-top ease-in-out 0.2s;
        }
        .card .card-info .thumb-count:hover,
        .card .card-info .comment-count:hover {
          color: #007bff;
          margin-top: -3px;
        }
        .card .card-info .thumb-count .on {
          color: #007bff;
        }
      `}</style>
    </div>
  );
};

export default Post;
