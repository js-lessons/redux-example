import { call, put } from 'redux-saga/effects'
import { commentsLoaded } from '../../actions/comments'
import { snapshotToArray, getComments, saveComment } from '../../utils/firebase'
import { addComment, loadComments } from '../comments'

describe('comments', () => {
  describe('addComment', () => {
    it('saves comment into some kind of datastore', () => {
      const comment = 'it is a comment'
      const action = { comment }
      const gen = addComment(action)

      expect(gen.next().value).toEqual(call(saveComment, comment))
    })
  })

  describe('loadComments', () => {
    it('loads comments from some kind of datastore', () => {
      const snapshot = 'snap mock'
      const comments = 'comments mock'
      const gen = loadComments()

      expect(gen.next().value).toEqual(call(getComments))
      expect(gen.next(snapshot).value).toEqual(call(snapshotToArray, snapshot))
      expect(gen.next(comments).value).toEqual(put(commentsLoaded(comments)))
    })
  })
})
