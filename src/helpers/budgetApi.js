import { budgetCalculator } from '../components/Calculator.js';
import { db } from '../config/fire'
import { getUser } from './auth.js'

function _handleCreateBudget( data, userId) {
  console.log('handleCreateBudget activated, userId is', userId)
  initBudget( data, userId)
  .then((data) => addData(data, 'budgets'))
  .catch((err) => console.error('Woops, something went wrong here', err))
}

function initBudget( {budget, duration, budgetName, currency}, userId){
  const calcResult = budgetCalculator(budget, duration)
  return Promise.resolve({
          budgetName: budgetName,
          budget: {
            total: budget,
            monthly: calcResult.monthly,
            weekly: calcResult.weekly,
            daily: calcResult.daily,
            duration,
            remaining: budget,
            spent: 0,
            currency
          },
          members: {[userId]: true}
        })
  }

export function getMyBudgets(userId){
  console.log('GETTING BUDGETS FOR: ' + userId)
  let budgets = []
  let budgetsRef = db.collection('budgets')
  return budgetsRef.where(`members.${userId}`, '==', true).get()
  .then((snapshot) => {
    console.log(snapshot)
    snapshot.forEach((budget) => (
      budgets.push(budget.data())
    ))
  })
  .then(() => budgets)
  .catch((err) => console.error('something whent wrong here' , err))
}

export function getPurchases(userId, budgetId) {
  let purchases = []
  if(!budgetId || !userId) {
    return Promise.reject(new Error ('budgetId or userId missing'))
  }
  else {
    let purchaseRef = db.collection('budgets').doc(`${budgetId}`).collection('purchases')
    return purchaseRef.get()
    .then((snapshot) => {
      snapshot.forEach((purchase) => {
        purchases.push(purchase.data())
      })
    })
    .then(() => purchases) 
    .catch((err) => console.error(err, 'something went wrong getting purchases'))
  }
}

export function getCurrencies() {
  let currencies = []
  return db.collection('currencies').get()
  .then((snapshot) => {
    snapshot.forEach((currency) => {
      currencies.push(currency.data())
    })
  })
  .then(() => currencies)
  .catch((err) => console.error('something went wrong getting currencies', err))
}

function addData(data, location) {
  console.log('PushingData ---')
  console.log(data)
  if ( !location) 
  return console.error('no location found') 
  else {
    let budgetRef = db.collection(`${location}`)
    budgetRef.add(data)
    .then((docRef) => (
      docRef.update({id: docRef.id})
    ))
    .then((data) => console.log('data added successfully ', data) || data)
    .catch((err) => console.error(err, 'something went wrong adding the data'))
  }
}

export function addPurchases(data, budgetId, userId) {
  if(!budgetId || !userId) {
    return Promise.reject(new Error ('budgetId or userId missing'))
  }
  else {
    let purchaseRef = db.collection('budgets').doc(`${budgetId}`).collection('purchases')
    purchaseRef.add(data)
    .then((docRef) => (
      docRef.update({id: docRef.id})
    ))
    .then((e) => console.log('purchases successfully added!') || e)
    .catch((err) => console.error(err, 'Something went wrong adding purchases'))
  }
}

export const handleCreateBudget = _handleCreateBudget