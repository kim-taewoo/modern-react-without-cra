import * as ActionTypes from '@/data/rootActionTypes';
import * as actions from '@/data/rootActions';
import * as services from '@/data/rootServices';
import history from '@/utils/history';
import { all, fork, call, takeLatest, put, select } from 'redux-saga/effects';

function* login({ email, password }) {
  try {
    yield put(actions.showLoading());
    const { token, user } = yield call(services.login, email, password);
    yield put(actions.setAuth(token, user));
    yield fork(services.setToken, token);
    history.replace('/');
  } catch (e) {
    console.error(e);
    alert('로그인하는데 실패했습니다.');
  } finally {
    yield put(actions.hideLoading());
  }
}

function* logout() {
  try {
    yield put(actions.showLoading());
    yield fork(services.setToken, null);
    yield put(actions.resetAuth());
    history.replace('/login');
  } catch (e) {
    alert('로그아웃에 실패했습니다.');
  } finally {
    yield put(actions.hideLoading());
  }
}

function* checkToken() {
  try {
    yield put(actions.showLoading());

    const {
      user: { profile },
    } = yield select();

    const token = yield call(services.getToken);

    if (!profile && token) {
      const { user } = yield call(services.me, token);
      yield put(actions.setAuth(token, user));
    }
  } catch (e) {
    yield put(actions.logout());
  } finally {
    yield put(actions.hideLoading());
  }
}

function* signup({ email, name, file, password }) {
  try {
    yield put(actions.showLoading());
    yield call(services.signup, email, name, file, password);
    alert('가입이 완료되었습니다!');

    history.replace('/login');
  } catch (e) {
    alert('가입하는데 실패했습니다.');
  } finally {
    yield put(actions.hideLoading());
  }
}

function* watchLogin() {
  yield takeLatest(ActionTypes.LOGIN, login);
}

function* watchLogout() {
  yield takeLatest(ActionTypes.LOGOUT, logout);
}

function* watchCheckToken() {
  yield takeLatest(ActionTypes.CHECK_TOKEN, checkToken);
}

function* watchSignup() {
  yield takeLatest(ActionTypes.SIGNUP, signup);
}

export default function* userSaga() {
  yield all([fork(watchSignup), fork(watchCheckToken), fork(watchLogout), fork(watchLogin)]);
}
