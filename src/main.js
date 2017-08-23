import React from 'react'
import ReactDOM from 'react-dom'
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

ReactDOM.render(
  <CommentBox database={firebase.database()} />,
  document.getElementById('root')
)
