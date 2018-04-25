import { budgetCalculator } from '../components/Calculator.js';
import { ref } from '../config/fire'
import { getUser } from './auth.js'

function _handleCreateBudget(budget, time, userId, budgetName) {
  console.log('handleCreateBudget activated, userId is', userId)
  sortBudget(userId, budget, time, budgetName)
  .then((data) => pushData(data, 'budgets'))
  // .then((budgetId) => console.log(`push complete, data is ${budgetId}`))
  .then((budgetId) => setMember(budgetId, userId))
}

function sortBudget(userId, budget, time, budgetName){
  console.log('sorting budget and userId is', userId)
  const calcResult = budgetCalculator(budget, time)
  return Promise.resolve({
          name: budgetName,
          period: time,
          budget: {
            total: budget,
            monthly: calcResult.monthly,
            weekly: calcResult.weekly,
            daily: calcResult.daily
          },
        })
  }

  function setMember(budgetId, userId){
    let data = {
      [budgetId]: {
        [userId]: true
      }
    }
    return setData(data, 'members')
  }

// function handleCreateBudget(budget, time, userId, budgetName) {
//   const calcResult = budgetCalculator(budget, time)
//   const data = {
//     budgets: {
//       [budgetId]: {
//         name: budgetName,
//         period: time,
//         budget: {
//           total: budget,
//           monthly: calcResult.monthly,
//           weekly: calcResult.weekly,
//           daily: calcResult.daily
//         },
//       }
//     },
//   }
//   setData(data, getUser().uid)
// }



// members: {
//   [this.budgetId]: {
//     BudgetName: budgetName,
//     [userId]: true
//   }
// }

// purchases: [
  // {
  //   id: 1234,
  //   budgetId: 10000,
  //   name: 'item',
  //   type: 'purchase',
  //   price: '1230',
  //   currency: 'USD',
  //   date: '2018-01-01'
  // }, {
  //     id: 123,
  //     budgetId: 10000,
  //     name: 'item',
  //     type: 'purchase-smeared',
  //     price: '1230',
  //     currency: 'USD',
  //     fromDate: '2018-01-01',
  //     toDate: '2018-01-03',
  //   }
  // ],

function setData( data, location) {
  ref.child(`/${location}`)
  .set(data)
  .then(() => data)
}

function pushData(data, location) {
  console.log('PushData ---')
  console.log(data)
  if ( !location) 
  return console.error('no location found') 
  else {
    let postRef = ref.child(`/${location}`)
    let newRef = postRef.push()
    let postId = newRef.key
    console.log('postId', postId)
    return newRef.set(data)
    .then(() => {
      return postId
    })
  }
}

export const handleCreateBudget = _handleCreateBudget