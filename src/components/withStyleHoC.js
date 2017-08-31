import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default function(WrappedComponent) {
  return class WithStyle extends Component {

    static contextTypes = {
      style: PropTypes.object
    }

    render() {
      return <WrappedComponent {...this.props} style={this.context.style || {}}/>
    }
  }
}