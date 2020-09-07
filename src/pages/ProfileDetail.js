import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import connectStore from '@/hocs/connectStore';
import Post from '@/components/Post';
import PostLoading from '@/components/PostLoading';

const ProfileDetail = (props) => {
  const history = useHistory();
  const { actions, user, posts, comments, loading } = props;
  const {
    match: { params },
  } = props;
  useEffect(() => {
    if (!user.token) {
      // 토큰이 없으면 로그인 페이지로 이동
      history.replace('/login');
    } else {
      // 포스트 가져오기
      actions.resetPosts();
      actions.getUserPosts(params.userId);
    }
  }, []);

  const postList = useMemo(
    () =>
      posts.ids.map((id) => (
        <Post
          key={id}
          post={posts.entities[id]}
          comments={comments[id]}
          getComments={actions.getComments}
          onLikePost={actions.likePost}
          onCommentSubmit={actions.writeComment}
        />
      )),
    [posts, comments]
  );

  if (posts.ids.length) {
    return (
      <div className="posts container">
        {postList}
        <PostLoading
          postsLength={posts.ids.length}
          onReachPageEnd={actions.getUserPosts.bind(null, params.userId)}
          loading={loading}
          hasMorePosts={posts.hasMorePosts}
        />

        <style jsx>{`
          .container {
            max-width: 600px;
          }
        `}</style>
      </div>
    );
  } else {
    return (
      <div className="container">
        해당 유저의 게시물이 존재하지 않습니다.
        <style jsx>{`
          .container {
            max-width: 600px;
          }
        `}</style>
      </div>
    );
  }
};

export default connectStore(ProfileDetail);
