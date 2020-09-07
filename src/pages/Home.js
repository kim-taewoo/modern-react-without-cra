import React, { useMemo, useEffect } from 'react';
import connectStore from '@/hocs/connectStore';
import Post from '@/components/Post';
import PostForm from '@/components/PostForm';
import PostLoading from '@/components/PostLoading';

const Home = (props) => {
  const { posts, comments, user, history, actions, loading } = props;
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

  useEffect(() => {
    if (!user.token) {
      // 토큰이 없으면 로그인 페이지로 이동
      history.replace('/login');
    } else {
      // 포스트 가져오기
      actions.resetPosts();
      actions.getPosts();
    }
  }, []);

  return (
    <div className="posts container">
      <PostForm onPostSubmit={actions.writePost} />
      {postList}
      {posts.ids.length && (
        <PostLoading
          postsLength={posts.ids.length}
          onReachPageEnd={actions.getPosts}
          loading={loading}
          hasMorePosts={posts.hasMorePosts}
        />
      )}

      <style jsx>{`
        .container {
          max-width: 600px;
        }
      `}</style>
    </div>
  );
};

export default connectStore(Home);
