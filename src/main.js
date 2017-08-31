import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import middlewares from './middlewares'
import CommentBox from './components/CommentBox'

const store = createStore(reducers, middlewares)

ReactDOM.render(
  <Provider store={store}>
    <CommentBox />
  </Provider>,
  document.getElementById('root')
)
