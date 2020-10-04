import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useQuery from '@/hooks/useQuery';
import connectStore from '@/hocs/connectStore';

function Login(props) {
  const { user, history, actions } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { returnUrl = '/' } = useQuery();

  useEffect(() => {
    if (user.token) {
      history.replace(`/`);
    }
  }, [user]);

  return (
    <div className="login container">
      <h1 className="text-center">로그인</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          actions.login(email, password, returnUrl);
        }}>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={!email || !password}>
          로그인
        </button>
      </form>
      <p className="text-help text-center">
        계정이 필요하신가요?{' '}
        <Link className="text-center new-account" to="/signup">
          계정 만들기
        </Link>
      </p>
      <style jsx global>{`
        .login form {
          max-width: 320px;
          padding: 8px;
          margin: 0 auto;
        }
        .login input.form-control {
          font-size: 16px;
          height: auto;
          padding: 10px;
        }
        .login button.btn {
          background-color: #3b5999;
          color: #fffffe;
          font-weight: 800;
          border-color: unset;
          margin-top: 10px;
        }
        .login .text-help {
          margin-top: 10px;
        }
        .login .new-account {
          font-weight: 900;
          color: #3a5999;
        }
      `}</style>
    </div>
  );
}

export default connectStore(Login);
