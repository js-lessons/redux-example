import {applyMiddleware} from 'redux'
import firebase from './firebase'

export default applyMiddleware(firebase)