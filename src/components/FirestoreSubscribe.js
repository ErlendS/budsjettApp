import React from "react";
import PropTypes from 'prop-types';
import { db } from '../config/fire'


export default class FirestoreSubscribe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: undefined };
  }
  
  componentDidMount() {
    if (typeof this.props.query === 'function') {
      const collectionRef = this.props.query(db);
      this.stopListening = collectionRef.onSnapshot(collectionSnapshot => {
        const values = []
        console.log(collectionSnapshot)
        collectionSnapshot.forEach((value) => {
          values.push(value.data())
        })
        console.log('FirestoreSubscribe values', values)
        this.setState({ value: values });
      })
    } else if (typeof this.props.get === 'function') {
      const docRef = this.props.get(db);
      docRef.get()
      .then(docSnapshot => {
        this.setState({ value: docSnapshot.data() });
      })
    }
  }

  componentWillUnmount() {
    if (typeof this.stopListening === 'function') {
      this.stopListening()
    }
  }
  
  render() {
    console.log('FirestoreSubscribe', this.state)
    return this.props.children(this.state.value)
  }
}

export const FirebaseUserBudget = ({ userId, children }) => {
  return (
    <FirestoreSubscribe
      children={children}
      query={db => db
        .collection('budgets')
        .where(`members.${userId}`, '==', true)
      }
    />
  )
}

FirestoreSubscribe.propTypes = {
  query: PropTypes.func,
  get: PropTypes.func,
  children: PropTypes.func.isRequired,
}