import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { commentsLoaded } from '../actions/comments'

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
    commentsWasLoaded: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired,
    database: PropTypes.object.isRequired
  }

  loadCommentsFromServer = () => {
    const { database, commentsWasLoaded } = this.props

    database.ref('/comments').on('value', (snapshot) => {
      const comments = snapshotToArray(snapshot) || []
      commentsWasLoaded(comments)
    })
  }

  handleCommentSubmit = (comment) => {
    const { database } = this.props
    const newCommentRef = database.ref('/comments').push()
    newCommentRef.set(comment)
  }

  componentDidMount() {
    this.loadCommentsFromServer()
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.comments} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  comments: state.comments
})

const mapDispatchToProps = dispatch => ({
  commentsWasLoaded: comments => {
    dispatch(commentsLoaded(comments))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox)