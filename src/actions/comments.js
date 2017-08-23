
export const loadComments = () => ({
  type: 'LOAD_COMMENTS'
})

export const commentsLoaded = comments => ({
  type: 'COMMENTS_LOADED',
  comments
})

export const addComment = comment => ({
  type: 'ADD_COMMENT',
  comment
})