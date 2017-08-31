import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { initializeFirebase } from './utils/firebase'
import sagas from './sagas'
import reducers from './reducers'
import CommentBox from './components/CommentBox'

initializeFirebase()

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    <CommentBox/>
  </Provider>,
  document.getElementById('root')
)
