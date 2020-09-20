import * as ActionTypes from '@/data/rootActionTypes';
import * as services from '@/data/rootServices';
import * as actions from '@/data/rootActions';
import * as MESSAGE from '@/constants/MESSAGE';
import { select, call, fork, all, put, takeLeading, takeEvery } from 'redux-saga/effects';

function* writeComment({ postId, contents }) {
  try {
    yield put(actions.showLoading());
    const { token } = yield select((state) => state.user);
    const { comment } = yield call(services.writeComment, token, postId, contents);

    yield put(actions.prependComment(postId, comment));
  } catch {
    yield call(alert, MESSAGE.COMMENT_WRITE_FAIL);
  } finally {
    yield put(actions.hideLoading());
  }
}

function* getComments({ postId }) {
  try {
    const { token } = yield select((state) => state.user);
    const { comments } = yield call(services.fetchComments, token, postId);

    yield put(actions.appendComments(postId, comments));
  } catch (e) {
    yield call(alert, MESSAGE.COMMENT_FETCH_FAIL);
  }
}

function* watchWriteComment() {
  yield takeLeading(ActionTypes.WRITE_COMMENT, writeComment);
}

function* watchGetComments() {
  yield takeEvery(ActionTypes.GET_COMMENTS, getComments);
}

export default function* commentsSaga() {
  yield all([fork(watchGetComments), fork(watchWriteComment)]);
}
