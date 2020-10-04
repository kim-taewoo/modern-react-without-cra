import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import history from '@/utils/history';
import userSaga from './sagas';
import * as actions from '@/data/rootActions';
import * as ActionTypes from '@/data/rootActionTypes';
import * as services from '@/data/rootServices';

describe('userSaga', () => {
  describe('autoLogin', () => {
    test('인증정보가 없고 로컬 스토리지에 토큰이 있으면 자동 로그인을 시도한다', () => {
      const state = { user: {} };

      return expectSaga(userSaga)
        .withState(state)
        .provide([
          [call.fn(services.getToken), 'foo'],
          [call.fn(services.me), { user: 'bar' }],
        ])
        .put(actions.showLoading())
        .put(actions.setAuth('foo', 'bar'))
        .put(actions.hideLoading())
        .silentRun();
    });

    test('자동 로그인 시 토큰이 유효하지 않으면 로그아웃을 시도한다', () => {
      const state = { user: {} };

      return expectSaga(userSaga)
        .withState(state)
        .provide([
          [call.fn(services.getToken), 'foo'],
          [call.fn(services.me), Promise.reject()],
        ])
        .put(actions.showLoading())
        .put(actions.logout())
        .put(actions.hideLoading())
        .silentRun();
    });
  });

  describe('watchLogin', () => {
    test('LOGIN 액션이 발생하면 로그인을 시도한다', () => {
      const state = { user: {} };

      return expectSaga(userSaga)
        .withState(state)
        .provide([
          [call.fn(services.login), { token: 'token', user: 'user' }],
          [call.fn(services.getToken), null], // autoLogin 이 진행되지 않도록 처리
        ])
        .take(ActionTypes.LOGIN)
        .put(actions.showLoading())
        .put(actions.setAuth('token', 'user'))
        .call(services.setToken, 'token')
        .call(history.replace, 'baz')
        .put(actions.hideLoading())
        .dispatch(actions.login('foo', 'bar', 'baz'))
        .silentRun();
    });

    test('로그인 과정에서 오류가 발생하면 안내 메시지를 출력한다', () => {
      const state = { user: {} };

      return expectSaga(userSaga)
        .withState(state)
        .provide([
          [call.fn(services.login), Promise.reject()],
          [call.fn(services.getToken), null], // autoLogin 이 진행되지 않도록 처리
        ])
        .take(ActionTypes.LOGIN)
        .put(actions.showLoading())
        .call.like({ fn: window.alert })
        .put(actions.hideLoading())
        .dispatch(actions.login('foo', 'bar', '/'))
        .silentRun();
    });
  });

  describe('watchLogout', () => {
    test('LOGOUT 액션이 발생하면 로그아웃을 시도한다', () => {
      const state = { user: { profile: 'foo' } };

      return expectSaga(userSaga)
        .withState(state)
        .take(ActionTypes.LOGOUT)
        .put(actions.resetAuth())
        .put(actions.resetPosts())
        .call(services.setToken, null)
        .call(history.replace, '/login')
        .dispatch(actions.logout())
        .silentRun();
    });
  });

  describe('watchSignup', () => {
    test('SIGNUP 액션이 발생하면 회원 가입을 시도한다', () => {
      const state = { user: {} };

      return expectSaga(userSaga)
        .withState(state)
        .provide([
          [call.fn(services.signup), Promise.resolve()],
          [call.fn(services.getToken), null], // autoLogin 이 진행되지 않도록 처리
        ])
        .take(ActionTypes.SIGNUP)
        .put(actions.showLoading())
        .call.like({ fn: services.signup })
        .call.like({ fn: window.alert })
        .call(history.replace, '/login')
        .put(actions.hideLoading())
        .dispatch(actions.signup('foo', 'bar', 'baz', 'qux'))
        .silentRun();
    });

    test('회원 가입 과정에서 오류가 발생하면 안내 메시지를 출력한다', () => {
      const state = { user: {} };

      return expectSaga(userSaga)
        .withState(state)
        .provide([
          [call.fn(services.signup), Promise.reject()],
          [call.fn(services.getToken), null], // autoLogin 이 진행되지 않도록 처리
        ])
        .take(ActionTypes.SIGNUP)
        .put(actions.showLoading())
        .call.like({ fn: services.signup })
        .call.like({ fn: window.alert })
        .not.call(history.replace, '/login')
        .put(actions.hideLoading())
        .dispatch(actions.signup('foo', 'bar', 'baz', 'qux'))
        .silentRun();
    });
  });
});
