import React from 'react';
import toggle from '@/hocs/toggle';
import { useHistory } from 'react-router-dom';

const Profile = ({ user }) => {
  const history = useHistory();
  const { id, name, profileImage } = user;
  return (
    <li className="nav-item">
      <a
        onClick={() => {
          history.push(`/u/${id}`);
        }}
        className="nav-link">
        {profileImage ? <img src={profileImage} alt="" /> : false} {name}
      </a>
      <style jsx>{`
        .nav-item img {
          width: 25px;
          height: 25px;
          border-radius: 100%;
          overflow: hidden;
          margin-right: 5px;
        }
      `}</style>
    </li>
  );
};

export default toggle(Profile);
