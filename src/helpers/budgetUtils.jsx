import date, {
  format,
  differenceInCalendarDays,
  addDays,
  eachDay,
  isAfter,
} from 'date-fns'
import currency from 'currency.js'
import { groupBy, compose } from 'ramda'
// export function getBudgetData(budget) {

// }
const groupByStartDate = groupBy(purchase => purchase.startDate)

export const totalSpending = purchases => {
  const reducer = (acc, val) => currency(acc).add(val.price)
  const sum = purchases.reduce(reducer, 0)
  return sum
}

const smearPurchase = purchase => {
  if (!purchase.smear) return [purchase]
  const smearedPurchases = []
  for (let i = 0; i < purchase.smearDuration; i++) {
    smearedPurchases.push({
      type: 'purchase:smeared',
      parentId: purchase.id,
      price: purchase.price / purchase.smearDuration,
      startDate: format(
        addDays(purchase.startDate, i).toString(),
        'YYYY-MM-DD'
      ),
      itemName: `${purchase.itemName}(${i + 1}/${purchase.smearDuration})`,
    })
  }
  return smearedPurchases
}

export const smearPurchases = purchases => {
  let smearedPurchases = []
  purchases.forEach(purchase => {
    if (purchase.smear) {
      smearedPurchases.push(...smearPurchase(purchase))
    } else {
      smearedPurchases.push(purchase)
    }
  })
  return smearedPurchases
}

const getPurchasesMeta = purchases => {
  if (!purchases || !purchases[0]) {
    throw new Error('getPurchasesMeta was called without purchases')
  }
  const reducer = (acc, val) => {
    const sum = currency(acc.sum).add(val.price)
    if (acc.startDate > val.startDate) {
      acc.startDate = val.startDate
    }
    if (acc.endDate > val.startDate) {
      acc.endDate = val.startDate
    }
    return { ...acc, sum }
  }

  const meta = purchases.reduce(reducer, {
    sum: 0,
    startDate: purchases[0].startDate,
    endDate: purchases[0].endDate,
    allPurchases: purchases.sort((a, b) =>
      currency(a.price).subtract(currency(b.price))
    ),
  })
  return {
    sum: meta.sum,
    startDate: date.parse(meta.startDate),
    endDate: date.parse(meta.endDate),
    allPurchases: meta.allPurchases,
  }
}

// returns array with strings
export const date_YYYY_MM_DD = (start, end) => {
  const days = eachDay(start, end)
  return days.map(day => format(day, 'YYYY-MM-DD'))
}

export const burnRate = (purchases, budget) => {
  console.log('recived data')

  const purchasesByDate = groupByStartDate(purchases)

  const tripDuration = duration(budget.meta.tripEnd, budget.meta.tripStart)

  const dailyBudget = Math.floor(budget.meta.total / tripDuration)
  // console.log('your daily budget is ', dailyBudget)
  let sumOfPurchases = 0

  return Object.keys(purchasesByDate)
    .sort((a, b) => (b > a ? -1 : 1))
    .map(dateKey => {
      const purchaseGroup = purchasesByDate[dateKey]
      // return Object.values(purchasesByDate).map(purchaseGroup => {
      const dateMeta = getPurchasesMeta(purchaseGroup)
      const dayN = duration(dateMeta.startDate, budget.meta.tripStart) + 1

      //sumOfPurchases is wrong beacuse the function does not add it in order
      // create sumOfPurchasesUntilNow(purchaseGroup, dayN)
      // the function adds all purchses for the n amout of days.
      console.log('dayN', dayN)

      sumOfPurchases = Math.floor(currency(sumOfPurchases).add(dateMeta.sum))
      const prefSpending = Math.floor(currency(dailyBudget).multiply(dayN))
      let limit = Math.floor(currency(prefSpending).subtract(sumOfPurchases))
      console.log('dailyBudget', dailyBudget)
      console.log('prefSpending', prefSpending)
      console.log('sumOfPurchases', sumOfPurchases)
      console.log('limit', limit)
      if (limit < 0) {
        limit = 0
      }
      return {
        x: dateMeta.startDate,
        y: limit,
      }
    })
}

export const findMaxOfY = (purchases, budget) => {
  const purchasesByDate = groupByStartDate(purchases)

  const prices = Object.values(purchasesByDate).map(
    pInfo => getPurchasesMeta(pInfo).sum
  )
  let burnR = []
  let burnObj = burnRate(purchases, budget)
  burnObj.map(obj => {
    return burnR.push(obj.y)
  })
  const highestPurchase = prices.sort((a, b) => a - b).pop()
  let highestBurn = burnR.sort((a, b) => a - b).pop()

  const maxOfY = highestPurchase > highestBurn ? highestPurchase : highestBurn
  console.log('MAX OF Y IS ----', maxOfY)

  return maxOfY
}

const dottingFn = (string, number) => {
  // console.log('received split obj', string, number)
  if (typeof string !== 'string') {
    console.error('you need to send in string and number types to dootingFn')
  }
  const n = Math.floor(number).toString()
  if (string.length + n.length < 25) {
    const st = string.trim()
    const s = st.charAt(0).toUpperCase() + st.slice(1)
    // console.log(s)

    const dots = '.'.repeat(25 - s.length - n.length)
    return `${s}${dots}$${n}`
  }
  if (string.length > 20) {
    console.error('items above 20 character length will be ingored')
  }
}

const itemFormatter = array => {
  return array.map(item => dottingFn(item.itemName, item.price)).join('\n')
}

export const purchasesToChartData = purchases => {
  const purchasesByDate = groupBy(purchase => purchase.startDate, purchases)
  let defT = 'No purchases yet.'
  // console.log('purchasesByDate', purchasesByDate)

  return Object.values(purchasesByDate).map(purchaseGroup => {
    const meta = getPurchasesMeta(purchaseGroup)
    return {
      x: meta.startDate,
      y: meta.sum,
      l: itemFormatter(meta.allPurchases),
    }
  })
}

export const duration = (end, start = new Date()) => {
  console.log('Duration left function', new Date())

  return differenceInCalendarDays(end, start)
}

//TODO :
// 2 - complete dynamic label.
