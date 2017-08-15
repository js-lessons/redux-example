import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import showdown from 'showdown'

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

const mockedComments = [
  {
    author: 'Pete Hunt',
    text: 'Hey there!'
  }
]

class CommentBox extends Component {
  static propTypes = {
    pollInterval: PropTypes.number.isRequired
  }

  state = {data: []}

  loadCommentsFromServer = () => {
    setTimeout(() => {
      this.setState({data: mockedComments})
    }, 500)
  }

  handleCommentSubmit = (comment) => {
    const comments = [...this.state.data, comment]

    this.setState({data: comments}, () => {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
      mockedComments.push(comment)
    })
  }

  componentDidMount() {
    this.loadCommentsFromServer()
    setInterval(this.loadCommentsFromServer, this.props.pollInterval)
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    )
  }
}

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

ReactDOM.render(
  <CommentBox url="comments.json" pollInterval={2000} />,
  document.getElementById('root')
)
