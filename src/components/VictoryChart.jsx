// Victory
import React, { Component } from 'react'
import {
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryLine,
  VictoryScatter,
  VictoryVoronoiContainer,
  VictoryZoomContainer,
  createContainer,
} from 'victory'
import {
  purchasesToChartData,
  smearPurchases,
  duration,
  burnRate,
  findMaxOfY,
} from '../helpers/budgetUtils'
import date from 'date-fns'

const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi')

export default class UserBudgetGraph extends Component {
  constructor() {
    super()
    this.state = {}
  }

  handleZoom(domain) {
    this.setState({ selectDomain: domain })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let durationOfTrip = duration(
      nextProps.budget.meta.tripEnd,
      nextProps.budget.meta.tripStart
    )
    if (nextProps.purchases !== prevState.purchases) {
      // find highest purchase from both purchases and burn rate and use
      // as max for y
      return {
        purchases: nextProps.purchases,
        smearedPurchases: smearPurchases(nextProps.purchases),
        domain: {
          x: [
            date.parse(nextProps.budget.meta.tripStart),
            date.parse(nextProps.budget.meta.tripEnd),
          ],
          y: [0, findMaxOfY(nextProps.purchases, nextProps.budget)],
        },
      }
    } else return null
  }

  render() {
    return (
      <VictoryChart
        width={800}
        height={400}
        scale={{ x: 'time' }}
        domainPadding={{ x: 10, y: 5 }}
        domain={this.state.domain}
        containerComponent={
          <VictoryZoomVoronoiContainer
            voronoiDimension="x"
            zoomDimension="x"
            zoomDomain={this.state.zoomDomain}
            onZoomDomainChange={this.handleZoom.bind(this)}
            labels={d => `Purchases today: \n ${d.l}`}
            labelComponent={
              <VictoryTooltip
                cornerRadius={0}
                style={{ fontFamily: 'monospace' }}
              />
            }
          />
        }
      >
        {/* <VictoryAxis /> */}
        <VictoryLine
          // labelComponent={<VictoryTooltip />}
          // labels={d => `y: ${d.label}`}
          data={purchasesToChartData(this.state.smearedPurchases)}
          style={{
            data: {
              strokeWidth: (d, active) => (active ? 3 : 2),
            },
          }}
        />
        <VictoryLine
          data={burnRate(this.state.smearedPurchases, this.props.budget)}
          style={{
            data: {
              strokeWidth: (d, active) => (active ? 3 : 2),
              stroke: 'tomato',
            },
          }}
        />
        {/* <VictoryScatter
          data={}
          size={4}
        /> */}
      </VictoryChart>
    )
  }
}
