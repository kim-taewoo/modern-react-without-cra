import React, { useEffect } from 'react';
import connectStore from '../hocs/connectStore';

const Logout = (props) => {
  const { actions } = props;
  useEffect(() => void actions.logout());

  return (
    <div className="text-center">
      <h2>Logout...</h2>
    </div>
  );
};

export default connectStore(Logout);
