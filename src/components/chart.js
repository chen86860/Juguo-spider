import React, { Component } from 'react'
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
import './chart.scss'

export default class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
    }
    this.chartContainer = React.createRef()
  }
  static getDerivedStateFromProps(prevProps, prevState) {
    const { list } = prevProps
    if (Array.isArray(list) && list.length > 0) {
      return {
        ...prevState,
        list,
      }
    }
    return null
  }
  componentDidUpdate(prevProps, prevState) {
    const { list } = this.state
    if (Array.isArray(list) && list.length > 0) {
      this.handelRenderChart(list)
    }
  }
  processData = data => {
    const arr = data.map(item => {
      let innerArr = {}
      // the key of id is date
      innerArr['date'] = item.id
      item.data.forEach(roomItem => {
        innerArr[roomItem.id] = parseFloat(roomItem.price)
      })
      return innerArr
    })

    return arr
  }
  handelRenderChart = data => {
    const formatedData = this.processData(data)
    const fields = [...new Set(...formatedData.map(item => Object.keys(item)))].filter(
      item => item !== 'date'
    )
    const ds = new DataSet()
    const dv = ds.createView().source(formatedData)
    dv.transform({
      type: 'fold',
      fields, // 展开字段集
      key: 'roomId', // key字段
      value: 'price', // value字段
      retains: ['date'],
    })
    const container = this.chartContainer.current
    var chart = new G2.Chart({
      container,
      forceFit: true,
      height: window.innerHeight / 2,
    })
    chart.source(dv, {
      date: {
        range: [0, 1],
      },
    })
    chart.tooltip({
      crosshairs: {
        type: 'x',
      },
    })
    chart.axis('price', {
      label: {
        formatter: function formatter(val) {
          return '￥' + val
        },
      },
    })
    chart.axis('date', {
      label: {
        formatter: function formatter(val) {
          return new Date(parseInt(val)).toLocaleString()
        },
      },
    })
    chart
      .line()
      .position('date*price')
      .color('roomId')
      .shape('smooth')
    chart
      .point()
      .position('date*price')
      .color('roomId')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      })
    chart.render()
  }

  render() {
    return (
      <div className="chartWrap">
        <div ref={this.chartContainer} />
      </div>
    )
  }
}
