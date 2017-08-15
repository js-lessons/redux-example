import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import showdown from 'showdown'
import firebase from 'firebase'

const converter = new showdown.Converter()
const firebaseConfig = {
  apiKey: 'AIzaSyAFj1kU8V5xLpBHLab6n1iPyg5ogVgJKwc',
  authDomain: 'comments-demo-e289c.firebaseapp.com',
  databaseURL: 'https://comments-demo-e289c.firebaseio.com',
  projectId: 'comments-demo-e289c',
  storageBucket: '',
  messagingSenderId: '110382393864'
}
const snapshotToArray = (snapshot) => {
  const returnArr = []

  snapshot.forEach((childSnapshot) => {
    returnArr.push(childSnapshot.val())
  })

  return returnArr
}

firebase.initializeApp(firebaseConfig)

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

class CommentBox extends Component {
  static propTypes = {
    pollInterval: PropTypes.number.isRequired,
    database: PropTypes.object.isRequired
  }

  state = {data: []}

  loadCommentsFromServer = () => {
    const { database } = this.props

    database.ref('/comments').once('value').then((snapshot) => {
      const comments = snapshotToArray(snapshot) || []
      this.setState({data: comments})
    })
  }

  handleCommentSubmit = (comment) => {
    const comments = [...this.state.data, comment]
    const { database } = this.props

    this.setState({data: comments}, () => {
      // `setState` accepts a callback. To avoid (improbable) race condition,
      // `we'll send the ajax request right after we optimistically set the new
      // `state.
      const newCommentRef = database.ref('/comments').push()
      newCommentRef.set(comment)
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
  <CommentBox database={firebase.database()} pollInterval={2000} />,
  document.getElementById('root')
)
