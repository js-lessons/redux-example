import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import firebase from 'firebase'

import CommentBox from './components/CommentBox'

const firebaseConfig = {
  apiKey: 'AIzaSyAFj1kU8V5xLpBHLab6n1iPyg5ogVgJKwc',
  authDomain: 'comments-demo-e289c.firebaseapp.com',
  databaseURL: 'https://comments-demo-e289c.firebaseio.com',
  projectId: 'comments-demo-e289c',
  storageBucket: '',
  messagingSenderId: '110382393864'
}

firebase.initializeApp(firebaseConfig)

const store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <CommentBox database={firebase.database()} />
  </Provider>,
  document.getElementById('root')
)
