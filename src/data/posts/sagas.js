import * as ActionTypes from '@/data/rootActionTypes';
import * as actions from '@/data/rootActions';
import * as services from '@/data/rootServices';
import { select, call, fork, all, put, takeLatest, throttle } from 'redux-saga/effects';

function* writePost({ contents }) {
  try {
    yield put(actions.showLoading());

    const {
      user: { token },
    } = yield select();

    const { post } = yield call(services.writePost, token, contents);

    yield put(actions.prependPost(post));
  } catch {
    alert('포스트를 작성하는데 실패했습니다.');
  } finally {
    yield put(actions.hideLoading());
  }
}

function* getPosts({ offset, limit }) {
  try {
    yield put(actions.showLoading());

    const {
      user: { token },
    } = yield select();

    const { posts } = yield call(services.fetchPosts, token, offset, limit);
    if (posts.length < limit) {
      yield put(actions.noMorePosts());
    }

    yield put(actions.appendPosts(posts));
  } catch (e) {
    console.error(e);
    alert('포스트를 가져오는데 실패했습니다.');
  } finally {
    yield put(actions.hideLoading());
  }
}

function* likePost({ postId }) {
  try {
    yield put(actions.showLoading());

    const {
      user: { token },
    } = yield select();

    const { post } = yield call(services.likePost, token, postId);

    yield put(actions.modifyPost(post));
  } catch {
    alert('포스트에 좋아요를 하는 데 실패했습니다.');
  } finally {
    yield put(actions.hideLoading());
  }
}

function* getUserPosts({ userId, offset, limit }) {
  try {
    yield put(actions.showLoading());
    const {
      user: { token },
    } = yield select();

    const { posts } = yield call(services.fetchUserPosts, userId, token, offset, limit);
    if (posts.length < limit) {
      yield put(actions.noMorePosts());
    }

    yield put(actions.appendPosts(posts));
  } catch (e) {
    console.error(e);
    alert('유저 포스트를 가져오는데 실패했습니다.');
  } finally {
    yield put(actions.hideLoading());
  }
}

function* watchWritePost() {
  yield takeLatest(ActionTypes.WRITE_POST, writePost);
}

function* watchGetPosts() {
  yield throttle(3000, ActionTypes.GET_POSTS, getPosts);
}

function* watchLikePost() {
  yield takeLatest(ActionTypes.LIKE_POST, likePost);
}

function* watchGetUserPosts() {
  yield takeLatest(ActionTypes.GET_USER_POSTS, getUserPosts);
}

export default function* postsSaga() {
  yield all([fork(watchLikePost), fork(watchGetPosts), fork(watchWritePost), fork(watchGetUserPosts)]);
}
