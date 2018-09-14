import { h, render, Component } from 'preact'
import Chart from './components/chart'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <Chart />
      </div>
    )
  }
}

render(<App />, document.querySelector('#root'))
