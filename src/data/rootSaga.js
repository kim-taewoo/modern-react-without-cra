import { call, all } from 'redux-saga/effects';
import postSaga from './posts/sagas';
import commentSaga from './comments/sagas';
import userSaga from './user/sagas';

function* recoverable(...args) {
  while (true) {
    try {
      yield call(...args);
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(e);
      }
      // 필요시 센트리 에러 로그 적재
    }
  }
}

export default function* rootSaga() {
  yield all([recoverable(postSaga), recoverable(commentSaga), recoverable(userSaga)]);
}
