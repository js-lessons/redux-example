import { takeLatest, put, call } from 'redux-saga/effects'
import { snapshotToArray, getComments, saveComment } from '../utils/firebase'
import { LOAD_COMMENTS, ADD_COMMENT, commentsLoaded } from '../actions/comments'

export function *loadComments() {
  const snapshot = yield call(getComments)
  const comments = yield call(snapshotToArray, snapshot)
  yield put(commentsLoaded(comments))
}

export function *addComment({comment}) {
  yield call(saveComment, comment)
}

export default function *watchComments() {
  yield [
    takeLatest(LOAD_COMMENTS, loadComments),
    takeLatest(ADD_COMMENT, addComment)
  ]
}
