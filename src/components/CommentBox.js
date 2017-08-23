import React, {Component} from 'react'
import PropTypes from 'prop-types'

import CommentList from './CommentList'
import CommentForm from './CommentForm'

const snapshotToArray = (snapshot) => {
  const returnArr = []

  snapshot.forEach((childSnapshot) => {
    returnArr.push(childSnapshot.val())
  })

  return returnArr
}

class CommentBox extends Component {
  static propTypes = {
    database: PropTypes.object.isRequired
  }

  state = {data: []}

  loadCommentsFromServer = () => {
    const { database } = this.props

    database.ref('/comments').on('value', (snapshot) => {
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

export default CommentBox