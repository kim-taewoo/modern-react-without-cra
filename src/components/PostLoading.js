import React from 'react';
import useIntersect from '@/hooks/useIntersect';

const PostLoading = (props) => {
  const [ref, entry] = useIntersect({});
  if (!props.loading && props.hasMorePosts && entry.isIntersecting) {
    props.onReachPageEnd(props.postsLength);
  }

  if (props.hasMorePosts) {
    return <div ref={ref}></div>;
  } else {
    return <div>더 이상 불러올 게시글이 없습니다.</div>;
  }
};

export default PostLoading;
