import * as ActionTypes from '@/data/rootActionTypes';
import * as actions from '@/data/rootActions';
import * as services from '@/data/rootServices';
import * as MESSAGE from '@/constants/MESSAGE';
import history from '@/utils/history';
import { all, fork, call, takeLeading, put, select } from 'redux-saga/effects';

function* autoLogin() {
  // 자동 로그인은 앱이 시작될 때 한번만 이루어지면 되기 때문에
  // 특별한 트리거없이 바로 실행되는 형태로 구성한다.
  try {
    yield put(actions.showLoading());

    const { profile } = yield select((state) => state.user);
    const token = yield call(services.getToken);

    if (!profile && token) {
      const { user } = yield call(services.me, token);
      yield put(actions.setAuth(token, user));
    }
  } catch {
    yield put(actions.logout());
  } finally {
    yield put(actions.hideLoading());
  }
}

function* watchLogin() {
  // 실수로 더블 클릭을 하더라도 takeLeading 이므로 이후 요청은 무시
  // takeLeading 은 while (true) { yield take(...) } 와 동일
  yield takeLeading(ActionTypes.LOGIN, function* ({ email, password, returnUrl }) {
    try {
      yield put(actions.showLoading());

      const { token, user } = yield call(services.login, email, password);
      yield put(actions.setAuth(token, user));
      yield call(services.setToken, token);
      yield call(history.replace, returnUrl);
    } catch {
      yield call(alert, MESSAGE.LOGIN_FAIL);
    } finally {
      yield put(actions.hideLoading());
    }
  });
}

function* watchLogout() {
  yield takeLeading(ActionTypes.LOGOUT, function* () {
    yield put(actions.resetAuth());
    yield put(actions.resetPosts());
    yield call(services.setToken, null);
    yield call(history.replace, '/login');
  });
}

function* watchSignup() {
  yield takeLeading(ActionTypes.SIGNUP, function* ({ email, name, file, password }) {
    try {
      yield put(actions.showLoading());

      yield call(services.signup, email, name, file, password);
      yield call(alert, MESSAGE.SIGNUP_SUCCESS);
      yield call(history.replace, '/login');
    } catch {
      yield call(alert, MESSAGE.SIGNUP_FAIL);
    } finally {
      yield put(actions.hideLoading());
    }
  });
}

export default function* userSaga() {
  yield all([fork(autoLogin), fork(watchLogin), fork(watchLogout), fork(watchSignup)]);
}
