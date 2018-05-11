import React, { Component } from 'react'
import { date_DD_MM_YYYY } from '../helpers/budgetUtils'
import { Line } from 'react-chartjs-2'

class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartData: {
        labels: this.props.labels,
        datasets: [
          {
            label: 'Brukt',
            borderColor: ['rgba(45, 87, 137, 0.74)'],
            tension: [0.1],
            fill: false,
            //this.props.purchasesOrderedSum
            data: [45, 80, 110, 55, 95, 70, 80],
          },
          {
            label: 'Ikke Overstig',
            borderColor: ['rgba(0, 0, 0, 0.60)'],
            fill: true,
            tension: [0.1],
            pointRadius: 0,
            //this.props.burnRate
            data: [20, 105, 100, 65, 85, 65, 70],
          },
        ],
      },
    }
  }
  render() {
    return (
      <div className="chart">
        <Line
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: this.props.budget.budgetName,
              fontSize: 24,
            },
            legend: {
              position: 'right',
            },
            tooltips: {
              custom: function(tooltipModel) {
                // console.log('TOOLTIPMODEL BITCHES!')
                // console.log(tooltipModel)
              },
            },
          }}
          max-width="600px"
          max-height="400px"
        />
      </div>
    )
  }
}
export default Chart
