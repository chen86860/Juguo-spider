import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Chart from './components/chart'
import http from './base/http'
import './assets/style.scss'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
    }
  }
  componentDidMount() {
    http.get('http://116.196.110.78:3001').then(res => {
      const list = res.data
      this.setState({
        list,
      })
    })
  }
  render() {
    const { list } = this.state
    return (
      <div>
        <h1>某公寓租金变化曲线图</h1>
        <Chart list={list} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))
