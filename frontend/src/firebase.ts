import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBkH1aArlZrTVt7Mk2shBx5cTv2awb1avs',
  authDomain: 'introduct-dev.firebaseapp.com',
  projectId: 'introduct-dev',
  storageBucket: 'introduct-dev.appspot.com',
  messagingSenderId: '180643564271',
  appId: '1:180643564271:web:d711751656d080f5f0691a',
  measurementId: 'G-9BX89PWHY1',
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore()
export const storage = firebaseApp.storage()
