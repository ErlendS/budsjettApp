import React, {Component} from 'react'
import {Line} from 'react-chartjs-2';

class Chart extends Component {
  constructor(props){
    super(props)
    this.state = {
      chartData: {
        labels: ['30.03', '31.03', '01.04', '02.04', '03.04', '04.04', '05.04'],
        datasets: [
          {
            label: "Brukt",
            // backgroundColor: ['rgba(218, 34, 31, 0.3)'],
            borderColor:['rgba(31, 218, 34, 0.7)'],
            tension: [0.1],
            fill: false,
            data: [45,80,110,55,95,70,80],
          },
          {
            label: 'Dagelig budsjett',
            borderColor: ['rgba(218, 34, 31, 0.7)'],
            fill:false,
            tension: [0.1],
            data: [75,105,100,65,85,65,70]
          }
        ]
      }
    }
  }
  render(){
    return (
      <div className='chart'>
        <Line 
        data={this.state.chartData} options={{}} max-width='600px' max-height='400px'
        />
      </div>
    )
  }
}

let userdata = {
  period: ['31.03', '01.04', '02.04', '03.04', '05.04', '06.04', '07.04'],
  budsjett: {
    monthly: 12000,
    weekly: 4000,
    daily: 400 
  },
  outcome: {
    day1: [['snicker', 120], ['busbillett', 95], ['blahbla', 205]],
    day2: [['mat', 55], ['transport', 33], ['smoothie', 127]],
    day3: [['kjott', 200], ['mel', 176], ['appelsin', 20]],
    day4: [['mat', 166], ['kalkun', 33], ['hakkespett', 420]],
    day5: [['kamel', 269], ['gass', 173], ['fisker', 220]],
    day6: [['stol', 344], ['sjel', 233], ['spisepinner', 122]],
    day7: [['fisk', 155], ['sukkerspinn', 33], ['aligator', 111]],
  }
}

export default Chart



