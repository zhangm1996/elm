import React, { Component } from 'react'
import Headers from './components/Header'
import Section from './components/Section'
import axios from 'axios'
class Quality extends Component {
  state = {
    data: [],
    rank_id: null,
    params: {}
  }
  render() {
    return (
      <div>
        <Headers fn={this.change.bind(this)} />
        <Section f2={this.state.data} f3={this.state.params} />
      </div>
    )
  }
  change(data, id, params) {
    this.setState({
      data: data,
      rank_id: id,
      params: params
    })

    axios({
      url: '/restapi/shopping/v1/sale_list_items',
      params: {
        type: 'quality_meal',
        latitude: '38.913689',
        longitude: '121.614761',
        params: this.state.params,
        rank_id: this.state.rank_id,
        offset: '0',
        limit: '20',
        terminal: 'web'
      }
    }).then(res => {
      this.setState({
        data: res.data
      })
    })
  }
}

export default Quality
