import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadComments, addComment } from '../actions/comments'

import CommentList from './CommentList'
import CommentForm from './CommentForm'


class CommentBox extends PureComponent {
  static propTypes = {
    loadComments: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired
  }

  componentDidMount() {
    this.props.loadComments()
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.comments} />
        <CommentForm onCommentSubmit={this.props.addComment} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  comments: state.comments
})

const mapDispatchToProps = dispatch => ({
  loadComments: comments => {
    dispatch(loadComments(comments))
  },
  addComment: comment => {
    dispatch(addComment(comment))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox)