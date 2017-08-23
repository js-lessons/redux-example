import React from 'react'
import showdown from 'showdown'
import PropTypes from 'prop-types'

const converter = new showdown.Converter()

const Comment = ({ children, author }) => {
  const rawMarkup = converter.makeHtml(children.toString())

  return (
    <div className="comment">
      <h2 className="commentAuthor">
        {author}
      </h2>
      <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
    </div>
  )
}


Comment.propTypes = {
  children: PropTypes.string,
  author: PropTypes.string
}


export default Comment