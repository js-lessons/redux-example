export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const COMMENTS_LOADED = 'COMMENTS_LOADED'
export const ADD_COMMENT = 'ADD_COMMENT'

export const loadComments = () => ({
  type: LOAD_COMMENTS
})

export const commentsLoaded = comments => ({
  type: COMMENTS_LOADED,
  comments
})

export const addComment = comment => ({
  type: ADD_COMMENT,
  comment
})
