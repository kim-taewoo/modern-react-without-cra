import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import commentsSaga from './sagas';
import * as actions from '@/data/rootActions';
import * as ActionTypes from '@/data/rootActionTypes';
import * as services from '@/data/rootServices';

describe('commentsSaga', () => {
  describe('watchWriteComment', () => {
    test('WRITE_COMMENT 액션이 발생하면 댓글을 작성한다.', () => {
      const state = { user: { token: 'token' } };

      return expectSaga(commentsSaga)
        .withState(state)
        .provide([[call.fn(services.writeComment), { comment: 'comment' }]])
        .take(ActionTypes.WRITE_COMMENT)
        .put(actions.showLoading())
        .call(services.writeComment, 'token', 'postId', 'contents')
        .put(actions.prependComment('postId', 'comment'))
        .put(actions.hideLoading())
        .dispatch(actions.writeComment('postId', 'contents'))
        .silentRun();
    });

    test('댓글 작성 과정에서 오류가 발생하면 안내 메시지를 출력한다', () => {
      const state = { user: { token: 'token' } };

      return expectSaga(commentsSaga)
        .withState(state)
        .provide([[call.fn(services.writeComment), Promise.reject()]])
        .take(ActionTypes.WRITE_COMMENT)
        .put(actions.showLoading())
        .call(services.writeComment, 'token', 'postId', 'contents')
        .call.like({ fn: window.alert })
        .put(actions.hideLoading())
        .dispatch(actions.writeComment('postId', 'contents'))
        .silentRun();
    });
  });

  describe('watchGetComments', () => {
    test('GET_COMMENTS 액션이 발생하면 해당 포스트의 댓글을 가져온다', () => {
      const state = { user: { token: 'token' } };

      return expectSaga(commentsSaga)
        .withState(state)
        .provide([[call.fn(services.fetchComments), { comments: [] }]])
        .take(ActionTypes.GET_COMMENTS)
        .call(services.fetchComments, 'token', 'postId')
        .put(actions.appendComments('postId', []))
        .dispatch(actions.getComments('postId'))
        .silentRun();
    });

    test('댓글을 가져오는 과정에서 오류가 발생하면 안내 메시지를 출력한다', () => {
      const state = { user: { token: 'token' } };

      return expectSaga(commentsSaga)
        .withState(state)
        .provide([[call.fn(services.fetchComments), Promise.reject()]])
        .take(ActionTypes.GET_COMMENTS)
        .call(services.fetchComments, 'token', 'postId')
        .call.like({ fn: window.alert })
        .dispatch(actions.getComments('postId'))
        .silentRun();
    });
  });
});
