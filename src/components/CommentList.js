import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Comment from './Comment'

const CommentList = ({ data }) => {
  const commentNodes = data.map((comment, index) => (
    // `key` is a React-specific concept and is not mandatory for the
    // purpose of this tutorial. if you're curious, see more here:
    // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
    <Comment author={comment.author} key={index}>
      {comment.text}
    </Comment>
  ))

  return (
    <div className="commentList">
      {commentNodes}
    </div>
  )
}

CommentList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired
    })
  ).isRequired
}

export default CommentList