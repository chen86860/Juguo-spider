import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Chart from './components/chart'
import { fetchList } from './services'
import './assets/style.scss'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
    }
  }
  componentDidMount() {
    fetchList().then(res => {
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
