import { takeLatest, put, call } from 'redux-saga/effects'
import { getDatabase, snapshotToArray } from '../utils/firebase'
import { LOAD_COMMENTS, ADD_COMMENT, commentsLoaded } from '../actions/comments'

export const getComments = () => getDatabase().ref('/comments').once('value')
export const saveComment = (comment) => {
  const newCommentRef = getDatabase().ref('/comments').push()
  newCommentRef.set(comment)
}

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
