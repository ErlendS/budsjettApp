import { db, firebaseAuth } from '../config/fire'

export function createUser(email, password) {
  console.log('setting up user...')
  return firebaseAuth()
    .createUserWithEmailAndPassword(email, password)
    .then(saveUser)
    .catch(err => console.error('poop', err))
}

export function login(email, password) {
  return firebaseAuth().signInWithEmailAndPassword(email, password)
}

export function logout() {
  return firebaseAuth().signOut()
}

export function sendPasswordResetEmail(email) {
  return firebaseAuth()
    .sendPasswordResetEmail(email)
    .then(() => window.alert('Password has been reset and sendt to your email'))
    .catch(err =>
      console.error('something went wrong reseting the passowrd', err)
    )
}

export function setData(beta, userId) {
  !userId
    ? console.log('error no userID')
    : db
        .collection('users')
        .doc(`${userId}`)
        .set(
          {
            beta,
          },
          { merge: true }
        )
        .then(() => beta)
        .catch(error => console.log(error))
}

// export function addData(data, userId, budgetId) {
//   !userId
//     ? console.log('error no userId')
//     : db
//         .child(`/users/${userId}/budgets/${budgetId}/purchases`)
//         .push(data)
//         .then(() => data)
// }

function saveUser(user) {
  const userRef = db.collection('users').doc(`${user.uid}`)
  userRef
    .set({
      email: user.email,
      uid: user.uid,
    })
    .then(() => window.alert('Success!'))
  // .catch(err => console.error('something went wrong creating the user', err))
}

function setUpUserSubscription() {
  let userData
  firebaseAuth().onAuthStateChanged(function(user) {
    if (user) {
      userData = {
        userId: user.uid,
        email: user.email,
      }
    } else {
      userData = undefined
    }
  })
  return () => userData
}

// export const getUid = _getUid()
export const getUser = setUpUserSubscription()
