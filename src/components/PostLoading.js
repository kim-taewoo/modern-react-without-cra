import React, { forwardRef } from 'react';
import Spinner from './Spinner';

const PostLoading = (props, ref) => {
  const { isEnd } = props;

  return (
    <div className="post-loading" ref={ref}>
      {isEnd ? <div className="end">포스트가 더이상 없습니다.</div> : <Spinner />}
      <style jsx global>{`
        .post-loading {
          width: 100%;
          height: 100px;
          margin-top: 100px;
          position: relative;
        }
        .post-loading .end {
          line-height: 100px;
          text-align: center;
          color: #999999;
        }
      `}</style>
    </div>
  );
};

export default forwardRef(PostLoading);
