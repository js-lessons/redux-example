import firebase from 'firebase'

import {commentsLoaded} from '../actions/comments'
const firebaseConfig = {
  apiKey: 'AIzaSyAFj1kU8V5xLpBHLab6n1iPyg5ogVgJKwc',
  authDomain: 'comments-demo-e289c.firebaseapp.com',
  databaseURL: 'https://comments-demo-e289c.firebaseio.com',
  projectId: 'comments-demo-e289c',
  storageBucket: '',
  messagingSenderId: '110382393864'
}

firebase.initializeApp(firebaseConfig)
const database = firebase.database()

const snapshotToArray = (snapshot) => {
  const returnArr = []

  snapshot.forEach((childSnapshot) => {
    returnArr.push(childSnapshot.val())
  })

  return returnArr
}

const firebaseMiddleware = ({dispatch}) => next => action => {
  if (action.type === 'LOAD_COMMENTS') {
    database.ref('/comments').once('value', (snapshot) => {
      const comments = snapshotToArray(snapshot) || []
      dispatch(commentsLoaded(comments))
    })
  }

  if (action.type === 'ADD_COMMENT') {
    const newCommentRef = database.ref('/comments').push()
    newCommentRef.set(action.comment)
  }


  next(action)
}

export default firebaseMiddleware