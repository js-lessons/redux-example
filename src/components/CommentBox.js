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
    comments: PropTypes.array.isRequired,
    style: PropTypes.object
  }

  componentDidMount() {
    this.props.loadComments()
  }

  render() {
    const {brandPrimary} = this.props.style || {}
    return (
      <div className="commentBox">
        <h1 style={{color: brandPrimary}}>Comments</h1>
        <CommentList data={this.props.comments} style={this.props.style}/>
        <CommentForm onCommentSubmit={this.props.addComment} style={this.props.style}/>
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