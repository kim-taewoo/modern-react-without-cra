import React, { useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import connectStore from '@/hocs/connectStore';
import useIntersect from '@/hooks/useIntersect';
import Post from '@/components/Post';
import PostForm from '@/components/PostForm';
import PostLoading from '@/components/PostLoading';

const Home = (props) => {
  const { posts, comments, user, history, actions } = props;
  const { userId } = useParams();
  const [node, entry] = useIntersect({ threshold: 0.8 });
  const isEnd = useMemo(() => posts.ids.length < posts.offset, [posts.ids, posts.offset]);

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
      history.replace('/login?returnUrl=' + encodeURIComponent(history.location.pathname));
    } else {
      // 포스트 가져오기
      if (entry.isIntersecting && !isEnd) {
        if (userId) {
          actions.getUserPosts(userId);
        } else {
          actions.getPosts();
        }
      }
    }
  }, [user.token, entry.isIntersecting]);

  // 다른 사용자로 바뀔 경우 포스트 정보 초기화
  useEffect(() => void actions.resetPosts(), [userId]);

  return (
    <div className="posts container">
      <PostForm show={!userId} onPostSubmit={actions.writePost} />
      {postList}
      <PostLoading ref={node} isEnd={isEnd} />
      <style jsx>{`
        .container {
          max-width: 600px;
        }
      `}</style>
    </div>
  );
};

export default connectStore(Home);
