import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadComments, addComment } from '../actions/comments'

import CommentList from './CommentList'
import CommentForm from './CommentForm'

const themes = [
  {brandPrimary: 'blue', brandSecondary: 'yellow'},
  {brandPrimary: 'red', brandSecondary: 'grey'}
]

class CommentBox extends PureComponent {
  static propTypes = {
    loadComments: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired
  }

  state = {
    theme: 0
  }

  componentDidMount() {
    this.props.loadComments()
  }

  render() {
    const currentTheme = themes[this.state.theme]
    return (
      <div className="commentBox">
        <select onChange={e => this.setState({theme: e.target.value})} value={this.state.theme}>
          <option value="0">yellow-blue</option>
          <option value="1">grey-red</option>
        </select>
        <h1 style={{color: currentTheme.brandPrimary}}>Comments</h1>
        <CommentList data={this.props.comments} style={currentTheme}/>
        <CommentForm onCommentSubmit={this.props.addComment} style={currentTheme}/>
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