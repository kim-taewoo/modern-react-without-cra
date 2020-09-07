import React from 'react';
import connectStore from '@/hocs/connectStore';
import Logo from '@/components/Logo';
import Profile from '@/components/Profile';
import NaviItem from '@/components/NaviItem';

const Navigation = (props) => {
  const {
    user: { profile },
  } = props;

  return (
    <nav className="navbar fixed-top bg-blue">
      <Logo />
      <ul className="nav">
        <NaviItem show={!profile} to="/login" text="로그인" />
        <NaviItem show={!profile} to="/signup" text="회원가입" />
        <Profile show={profile} user={profile} />
        <NaviItem show={profile} to="/logout" text="로그아웃" />
      </ul>

      <style jsx>{`
        .fixed-top {
          height: 50px;
        }
        .bg-blue {
          background-color: #3b5999;
        }
        /* .nav 에는 임의의 prefix 가 추가되지만 .nav-item .nav-link 에는 추가되지 않음 */
        .nav :global(.nav-item .nav-link) {
          color: white;
          font-weight: 800;
          font-size: 12px;
          cursor: pointer;
          line-height: 26px;
        }
        .nav :global(.nav-item .nav-link:hover) {
          color: rgba(255, 255, 255, 0.75);
        }
      `}</style>
    </nav>
  );
};

export default connectStore(Navigation);
