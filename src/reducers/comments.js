
const comments = (state = [], action) => {
  if (action.type === 'ADD_COMMENT') {
    return [
      ...state,
      {...action.comment}
    ]
  }

  if (action.type === 'COMMENTS_LOADED') {
    return [
      ...action.comments
    ]
  }

  return state
}

export default comments