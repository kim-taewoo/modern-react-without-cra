import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import postsSaga from './sagas';
import * as POST from '@/constants/POST';
import * as actions from '@/data/rootActions';
import * as ActionTypes from '@/data/rootActionTypes';
import * as services from '@/data/rootServices';

describe('postsSaga', () => {
  describe('watchWritePost', () => {
    test('WRITE_POST 액션이 발생하면 글 작성을 시도한다', () => {
      const state = { user: { token: 'token' } };

      return expectSaga(postsSaga)
        .withState(state)
        .provide([[call.fn(services.writePost), { post: 'post' }]])
        .take(ActionTypes.WRITE_POST)
        .put(actions.showLoading())
        .call(services.writePost, 'token', 'contents')
        .put(actions.prependPost('post'))
        .put(actions.hideLoading())
        .dispatch(actions.writePost('contents'))
        .silentRun();
    });

    test('글 작성 과정에서 오류가 발생하면 안내 메시지를 출력한다', () => {
      const state = { user: { token: 'token' } };

      return expectSaga(postsSaga)
        .withState(state)
        .provide([[call.fn(services.writePost), Promise.reject()]])
        .take(ActionTypes.WRITE_POST)
        .put(actions.showLoading())
        .call(services.writePost, 'token', 'contents')
        .call.like({ fn: window.alert })
        .put(actions.hideLoading())
        .dispatch(actions.writePost('contents'))
        .silentRun();
    });
  });

  describe('watchLikePost', () => {
    test('LIKE_POST 액션이 발생하면 글에 좋아요 추가/제거를 시도한다', () => {
      const state = { user: { token: 'token' } };

      return expectSaga(postsSaga)
        .withState(state)
        .provide([[call.fn(services.likePost), { post: 'post' }]])
        .take(ActionTypes.LIKE_POST)
        .put(actions.showLoading())
        .call(services.likePost, 'token', 'postId')
        .put(actions.modifyPost('post'))
        .put(actions.hideLoading())
        .dispatch(actions.likePost('postId'))
        .silentRun();
    });

    test('좋아요 추가/제거 과정에서 오류가 발생하면 안내 메시지를 출력한다', () => {
      const state = { user: { token: 'token' } };

      return expectSaga(postsSaga)
        .withState(state)
        .provide([[call.fn(services.likePost), Promise.reject()]])
        .take(ActionTypes.LIKE_POST)
        .put(actions.showLoading())
        .call(services.likePost, 'token', 'postId')
        .call.like({ fn: window.alert })
        .put(actions.hideLoading())
        .dispatch(actions.likePost('postId'))
        .silentRun();
    });
  });

  describe('watchGetPosts', () => {
    test('GET_POSTS 액션이 발생하면 포스트들을 가져온다', () => {
      const state = {
        user: { token: 'token' },
        posts: { offset: 0 },
      };

      return expectSaga(postsSaga)
        .withState(state)
        .provide([[call.fn(services.fetchPosts), { posts: [] }]])
        .take(ActionTypes.GET_POSTS)
        .call(services.fetchPosts, 'token', 0, POST.LIMIT)
        .put(actions.appendPosts([]))
        .put(actions.setOffset(0 + POST.LIMIT))
        .dispatch(actions.getPosts())
        .silentRun();
    });

    test('포스트를 가져오는 과정에서 오류가 발생하면 안내 메시지를 출력한다', () => {
      const state = {
        user: { token: 'token' },
        posts: { offset: 0 },
      };

      return expectSaga(postsSaga)
        .withState(state)
        .provide([[call.fn(services.fetchPosts), Promise.reject()]])
        .take(ActionTypes.GET_POSTS)
        .call(services.fetchPosts, 'token', 0, 5)
        .call.like({ fn: window.alert })
        .dispatch(actions.getPosts())
        .silentRun();
    });
  });

  describe('watchGetUserPosts', () => {
    test('GET_USER_POSTS 액션이 발생하면 해당 유저의 포스트들을 가져온다', () => {
      const state = {
        user: { token: 'token' },
        posts: { offset: 0 },
      };

      return expectSaga(postsSaga)
        .withState(state)
        .provide([[call.fn(services.fetchUserPosts), { posts: [] }]])
        .take(ActionTypes.GET_USER_POSTS)
        .call(services.fetchUserPosts, 'token', 'userId', 0, POST.LIMIT)
        .put(actions.appendPosts([]))
        .put(actions.setOffset(0 + POST.LIMIT))
        .dispatch(actions.getUserPosts('userId'))
        .silentRun();
    });

    test('유저의 포스트를 가져오는 과정에서 오류가 발생하면 안내 메시지를 출력한다', () => {
      const state = {
        user: { token: 'token' },
        posts: { offset: 0 },
      };

      return expectSaga(postsSaga)
        .withState(state)
        .provide([[call.fn(services.fetchUserPosts), Promise.reject()]])
        .take(ActionTypes.GET_USER_POSTS)
        .call(services.fetchUserPosts, 'token', 'userId', 0, 5)
        .call.like({ fn: window.alert })
        .dispatch(actions.getUserPosts('userId'))
        .silentRun();
    });
  });
});
