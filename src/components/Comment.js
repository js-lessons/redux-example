import React from 'react'
import showdown from 'showdown'
import PropTypes from 'prop-types'
import withStyleHoC from './withStyleHoC'

const converter = new showdown.Converter()

const Comment = ({ children, author, style}) => {
  const rawMarkup = converter.makeHtml(children.toString())

  return (
    <div className="comment" style={{backgroundColor: style.brandSecondary}}>
      <h2 className="commentAuthor" style={{color: style.brandPrimary}}>
        {author}
      </h2>
      <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
    </div>
  )
}

Comment.propTypes = {
  children: PropTypes.string,
  author: PropTypes.string,
  style: PropTypes.object
}

export default withStyleHoC(Comment)