import * as ActionTypes from '@/data/rootActionTypes';
import * as services from '@/data/rootServices';
import * as actions from '@/data/rootActions';
import { select, call, fork, all, put, takeLatest } from 'redux-saga/effects';

function* writeComment({ postId, contents }) {
  try {
    yield put(actions.showLoading());
    const {
      user: { token },
    } = yield select();
    const { comment } = yield call(services.writeComment, token, postId, contents);

    yield put(actions.prependComment(postId, comment));
  } catch {
    alert('댓글을 작성하는데 실패했습니다.');
  } finally {
    yield put(actions.hideLoading());
  }
}

function* getComments({ postId }) {
  try {
    const {
      user: { token },
    } = yield select();
    const { comments } = yield call(services.fetchComments, token, postId);

    yield put(actions.appendComments(postId, comments));
  } catch (e) {
    console.error(e);
    alert('댓글을 가져오는데 실패했습니다.');
  }
}

function* watchWriteComment() {
  yield takeLatest(ActionTypes.WRITE_COMMENT, writeComment);
}

function* watchGetComments() {
  yield takeLatest(ActionTypes.GET_COMMENTS, getComments);
}

export default function* commentsSaga() {
  yield all([fork(watchGetComments), fork(watchWriteComment)]);
}
