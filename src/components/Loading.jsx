import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Loading',
      hide: true,
    };
  }
  componentDidMount() {
    const stopper = this.state.text + '...';

    const startLoader = () => {
      this.interval = window.setInterval(() => {
        this.setState({ hide: false });
        this.state.text === stopper
          ? this.setState(() => ({ text: 'Loading' }))
          : this.setState((prevState) => ({ text: prevState.text + '.' }))
      }, 300)
    }

    this.interval = window.setTimeout(startLoader, this.props.delay || 0);
  }
  // componentDidMount() {
  //   const stopper = this.state.text + '...';
  //   this.interval = window.setInterval(() => {
  //     this.state.text === stopper
  //       ? this.setState(() => ({ text: 'Loading' }))
  //       : this.setState((prevState) => ({ text: prevState.text + '.' }))
  //   }, 300)
  // }
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    if (this.state.hide) {
      return null
    }

    return (
      <h1>
        {this.state.text}
      </h1>
    )
  }
}

Loading.propTypes = {
  delay: PropTypes.number,
}

export default Loading