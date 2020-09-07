import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import connectStore from '../hocs/connectStore';

function SignUp(props) {
  const { actions } = props;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  return (
    <div className="signup container">
      <h1 className="text-center">계정 만들기</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          actions.signup(email, name, file, password);
        }}>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Your Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          className="form-control"
          placeholder="Profile"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          minLength="5"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Repeat your password"
          required
          onChange={(e) => setRepassword(e.target.value)}
        />
        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit"
          disabled={!email || !name || !password || password !== repassword}>
          가입하기
        </button>
      </form>
      <p className="text-help text-center">
        이미 계정이 있으신가요?{' '}
        <Link className="text-center login-here" to="/login">
          로그인 하기
        </Link>
      </p>
      <style jsx global>{`
        .signup form {
          max-width: 320px;
          padding: 8px;
          margin: 0 auto;
        }
        .signup input.form-control {
          font-size: 16px;
          height: auto;
          padding: 10px;
          margin-bottom: 1rem;
        }
        .signup button.btn {
          background-color: #3b5999;
          color: #fffffe;
          font-weight: 800;
          border-color: unset;
          margin-top: 10px;
        }
        .signup .text-help {
          margin-top: 10px;
        }
        .signup .login-here {
          font-weight: 900;
          color: #3a5999;
        }
      `}</style>
    </div>
  );
}

export default connectStore(SignUp);
