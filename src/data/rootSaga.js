import { all, fork } from 'redux-saga/effects';
import user from './user/sagas';
import posts from './posts/sagas';
import comments from './comments/sagas';
import loading from './loading/sagas';

// function* recoverable(...args) {
//   while (true) {
//     try {
//       yield call(...args);
//     } catch (e) {
//       Sentry.captureException(e);
//       if (process.env.NODE_ENV !== 'production') {
//         console.error(e);
//       }
//     }
//   }
// }

export default function* rootSaga() {
  yield all([fork(user), fork(posts), fork(comments), fork(loading)]);
}
