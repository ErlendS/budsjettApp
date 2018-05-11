import date, {
  format,
  differenceInCalendarDays,
  addDays,
  eachDay,
} from 'date-fns'
import currency from 'currency.js'

// export function getBudgetData(budget) {

// }

export const totalSpending = purchases => {
  const reducer = (acc, val) => currency(acc).add(val.price)
  const sum = purchases.reduce(reducer, 0)
  return sum
}

const smearPurchase = purchase => {
  if (!purchase.smeared) return [purchase]
  const smearedPurchases = []
  for (let i = 0; i < purchase.smearDuration; i++) {
    smearedPurchases.push({
      type: 'purchase:smeared',
      parentId: purchase.id,
      price: purchase.price / purchase.smearDuration,
      date: addDays(purchase.date, i).toString(),
      name: `${purchase.name} (${i + 1}/${purchase.smearDuration})`,
    })
  }
  return smearedPurchases
}

export const smearPurchases = purchases => {
  let smearedPurchases = []
  purchases.forEach(purchase => {
    if (purchase.smeared) {
      smearedPurchases.push(...smearPurchase(purchase))
    } else {
      smearedPurchases.push(purchase)
    }
  })
  return smearedPurchases
}

const getPurchasesMeta = purchases => {
  const reducer = (acc, val) => {
    const sum = currency(acc.sum).add(val.price)
    if (acc.startDate > val.date) {
      acc.startDate = val.date
    }
    if (acc.endDate > val.date) {
      acc.endDate = val.date
    }
    return { ...acc, sum }
  }
  const meta = purchases.reduce(reducer, { sum: 0, startDate: '', endDate: '' })
  return meta
}

export const date_YYYY_MM_DD = (start, end) => {
  const days = eachDay(start, end)
  return days.map(day => format(day, 'YYYY-MM-DD'))
}

export const burnRate = (sum, tripEnd, tripStart) => {
  return sum / differenceInCalendarDays(tripEnd, tripStart)
}

export const purchasesOrderedSum = (purchases, budget) => {
  let startToEnd = date_YYYY_MM_DD(budget.meta.tripStart, budget.meta.tripEnd)
  const reducer = (acc, val) => {}

  smearPurchases(purchases).reduce(reducer, {})
}

export const durationLeft = (tripEnd, tripStart = new Date()) => {
  console.log('Duration left function', new Date())

  return differenceInCalendarDays(tripEnd, tripStart)
}
