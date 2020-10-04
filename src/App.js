import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '@/utils/history';
import connectStore from '@/hocs/connectStore';
import Navigation from '@/components/Navigation';
import Loading from '@/components/Loading';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Logout from '@/pages/Logout';
import NotFound from '@/pages/NotFound';

const App = (props) => {

  return (
    <>
      <Router history={history}>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/logout" component={Logout} />
          {/* <Route path="/u/:userId" component={ProfileDetail} /> */}
          <Route path="*" component={NotFound} />
        </Switch>
        <Loading show={props.loading} />
      </Router>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          font-family: Dotum, '맑은 고딕', 'roboto', 'Helvetica Neue', Helvetica, Arial, '맑은 고딕', malgun gothic,
            '돋움', Dotum, sans-serif;
          color: #202b3d;
          background-color: #e9eaed;
          font-size: 12px;
          font-weight: 400;
          line-height: 1.5;
        }

        body {
          padding: 100px 0;
        }
      `}</style>
    </>
  );
};

export default connectStore(App);
