import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAFj1kU8V5xLpBHLab6n1iPyg5ogVgJKwc',
  authDomain: 'comments-demo-e289c.firebaseapp.com',
  databaseURL: 'https://comments-demo-e289c.firebaseio.com',
  projectId: 'comments-demo-e289c',
  storageBucket: '',
  messagingSenderId: '110382393864'
}

export const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig)
}

export const getComments = () => firebase.database().ref('/comments').once('value')

export const saveComment = (comment) => {
  const newCommentRef = firebase.database().ref('/comments').push()
  newCommentRef.set(comment)
}

export const snapshotToArray = (snapshot) => {
  const returnArr = []

  snapshot.forEach((childSnapshot) => {
    returnArr.push(childSnapshot.val())
  })

  return returnArr
}
