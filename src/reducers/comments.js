const comments = (state = [], action) => {
  if (action.type === 'ADD_COMMENT') {
    return [
      ...state,
      {...action.data}
    ]
  }
  console.log(action)

  if (action.type === 'COMMENTS_LOADED') {

    return [
      ...action.comments
    ]
  }

  return state
}

export default comments