import { db, firebaseAuth } from '../config/fire'

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


export function setData(beta, userId) {
  console.log('Setting beta, beta is', beta)
  !userId ? 
    console.log('error no userID') 
    : db.collection('users').doc(`${userId}`).set({
      beta}, {merge: true}
    )
  .then(() => beta)
  .catch(error => {(
    console.log(error),
    error)
  })
}

// ------------------------------------------------------------
// FUNCTION TO UPDATE ------------ NOT DONE
// export function addData(data, userId, budgetId) {
//   !userId 
//   ? console.log('error no userId')
//   : ref.child(`/users/${userId}/budgets/${budgetId}/purchases`)
//     .push(data) 
//     .then(() => data)
// }
export function addData(data, userId, budgetId) {
  !userId 
  ? console.log('error no userId')
  : db.child(`/users/${userId}/budgets/${budgetId}/purchases`)
    .push(data) 
    .then(() => data)
}

//-----------------------------------------------------------------
// FUNCTION TO UPDATE ---------- NOT DONE
// function saveUser(user){
//   ref.child(`/users/${user.uid}/info`)
//   .set({
//     email: user.email,
//     uid: user.uid
//   })
//   .then(() => user)
// }
function saveUser(user){
  db.child(`/users/${user.uid}/info`)
  .set({
    email: user.email,
    uid: user.uid
  })
  .then(() => user)
}
// -----------------------------------------------------------------


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
