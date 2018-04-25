import { ref, firebaseAuth } from '../config/fire'

export function createUser(email, password) {
  return firebaseAuth().createUserWithEmailAndPassword(email,  password)
    .then(saveUser)
}

export function login(email, password) {
  return firebaseAuth().signInWithEmailAndPassword(email, password)
}

export function logout() {
  return firebaseAuth().signOut()
}

export function setData(data, userId) {
  !userId ? 
    console.log('error no userID') 
    : ref.child(`/users/${userId}/budgets/`)
  .push(
    data
  )
  .then(() => data)
}

// export function pushData(data, location) {
//   !location 
//   ? console.log('error no location provided') 
//   : ref.child(`/${location}`)
//     .push().set(data)
//     .then(() => data)
// }

export function addData(data, userId, budgetId) {
  !userId 
  ? console.log('error no userId')
  : ref.child(`/users/${userId}/budgets/${budgetId}/purchases`)
    .push(data) 
    .then(() => data)
}

function saveUser(user){
  ref.child(`/users/${user.uid}/info`)
  .set({
    email: user.email,
    uid: user.uid
  })
  .then(() => user)
}

// function _getUid(){
//   let uid;
//   firebaseAuth().onAuthStateChanged(function(user) {
//     console.log('onAuthStateChanged')
//     if (user) {
//       uid = user.uid
//     } else {
//       uid = undefined
//     }
//   });
//   return () => uid
// }

function setUpUserSubscription(){
  let userData;
  firebaseAuth().onAuthStateChanged(function(user) {
    if (user) {
      userData = {
        userId: user.uid,
        email: user.email,
    }
    console.log(userData)
  } else {
     userData = undefined;
    }
  });
  return () => userData
}

// export const getUid = _getUid()
export const getUser = setUpUserSubscription()
