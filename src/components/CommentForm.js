import React, {Component} from 'react'
import PropTypes from 'prop-types'

class CommentForm extends Component {
  static propTypes = {
    onCommentSubmit: PropTypes.func.isRequired
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
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref={el => { this.author = el }} />
        <input type="text" placeholder="Say something..." ref={el => { this.text = el }} />
        <input type="submit" value="Post" />
      </form>
    )
  }
}

export default CommentForm