import { all, fork, put, select, call, takeLeading } from 'redux-saga/effects';
import * as POST from '@/constants/POST';
import * as MESSAGE from '@/constants/MESSAGE';
import * as ActionTypes from '@/data/rootActionTypes';
import * as actions from '@/data/rootActions';
import * as services from '@/data/rootServices';

function* writePost({ contents }) {
  try {
    yield put(actions.showLoading());

    const {
      user: { token },
    } = yield select();

    const { post } = yield call(services.writePost, token, contents);

    yield put(actions.prependPost(post));
  } catch {
    yield call(alert, MESSAGE.POST_WRITE_FAIL);
  } finally {
    yield put(actions.hideLoading());
  }
}

function* getPosts() {
  try {
    const {
      user: { token },
    } = yield select();

    const {
      posts: { offset },
    } = yield select();

    const { posts } = yield call(services.fetchPosts, token, offset, POST.LIMIT);

    yield put(actions.appendPosts(posts));
    yield put(actions.setOffset(offset + POST.LIMIT));
  } catch (e) {
      yield call(alert, MESSAGE.POST_FETCH_FAIL);
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
    yield call(alert, MESSAGE.POST_LIKE_FAIL);
  } finally {
    yield put(actions.hideLoading());
  }
}

function* getUserPosts({ userId }) {
  try {
      const { token } = yield select((state) => state.user);
      const { offset } = yield select((state) => state.posts);
      const { posts } = yield call(services.fetchUserPosts, token, userId, offset, POST.LIMIT);
      yield put(actions.appendPosts(posts));
      yield put(actions.setOffset(offset + POST.LIMIT));
    } catch {
      yield call(alert, MESSAGE.POST_FETCH_FAIL);
    }
}

function* watchWritePost() {
  yield takeLeading(ActionTypes.WRITE_POST, writePost);
}

function* watchGetPosts() {
  yield takeLeading(ActionTypes.GET_POSTS, getPosts);
}

function* watchLikePost() {
  yield takeLeading(ActionTypes.LIKE_POST, likePost);
}

function* watchGetUserPosts() {
  yield takeLeading(ActionTypes.GET_USER_POSTS, getUserPosts);
}

export default function* postsSaga() {
  yield all([fork(watchLikePost), fork(watchGetPosts), fork(watchWritePost), fork(watchGetUserPosts)]);
}
