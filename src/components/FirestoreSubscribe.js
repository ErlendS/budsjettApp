import React from 'react'
import PropTypes from 'prop-types'
import { db } from '../config/fire'

export default class FirestoreSubscribe extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: undefined }
  }

  componentDidMount() {
    if (typeof this.props.query === 'function') {
      const queryRef = this.props.query(db)
      this.stopListening = queryRef.onSnapshot(querySnapshot => {
        if (typeof querySnapshot.forEach === 'function') {
          // COLLECTION SUBSCRIPTION (eg. CollectionSnapshot)
          const values = []
          querySnapshot.forEach(value => {
            values.push(value.data())
          })
          return this.setState({ value: values })
        }
        // DOCUMENT SUBSCRIPTION (eg. DocumentSnapshot)
        return this.setState({ value: querySnapshot.data() })
      })
    } else if (typeof this.props.get === 'function') {
      const docRef = this.props.get(db)
      docRef.get().then(docSnapshot => {
        this.setState({ value: docSnapshot.data() })
      })
    }
  }

  componentWillUnmount() {
    if (typeof this.stopListening === 'function') {
      this.stopListening()
    }
  }

  render() {
    return this.props.children(this.state.value)
  }
}

export const FirebaseUserBudgets = ({ userId, children }) => {
  return (
    <FirestoreSubscribe
      key={userId}
      children={children}
      query={db =>
        db.collection('budgets').where(`members.${userId}`, '==', true)
      }
    />
  )
}

export const FirebaseUserBudget = ({ budgetId, children }) => {
  return (
    <FirestoreSubscribe
      key={budgetId}
      children={children}
      query={db => db.collection('budgets').doc(`${budgetId}`)}
    />
  )
}

export const FirebaseUserPurchase = ({ budgetId, children }) => {
  return (
    <FirestoreSubscribe
      key={budgetId}
      children={children}
      query={db =>
        db
          .collection('budgets')
          .doc(`${budgetId}`)
          .collection('purchases')
      }
    />
  )
}

FirebaseUserPurchase.propTypes = {
  budgetId: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
}

FirestoreSubscribe.propTypes = {
  query: PropTypes.func,
  get: PropTypes.func,
  children: PropTypes.func.isRequired,
}
