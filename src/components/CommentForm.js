import React, {Component} from 'react'
import PropTypes from 'prop-types'

class CommentForm extends Component {
  static propTypes = {
    onCommentSubmit: PropTypes.func.isRequired,
    style: PropTypes.object
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const author = this.author.value.trim()
    const text = this.text.value.trim()

    if (!text || !author) {
      return
    }

    this.props.onCommentSubmit({author: author, text: text})
    this.author.value = ''
    this.text.value = ''
  }

  render() {
    const {brandPrimary, brandSecondary} = this.props.style || {}
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          style={{borderColor: brandSecondary, color: brandPrimary}}
          placeholder="Your name"
          ref={el => { this.author = el }} />
        <input
          type="text"
          style={{borderColor: brandSecondary, color: brandPrimary}}
          placeholder="Say something..."
          ref={el => { this.text = el }} />
        <input type="submit" value="Post" />
      </form>
    )
  }
}

export default CommentForm