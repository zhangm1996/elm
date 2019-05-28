import React, { Component } from 'react'
import axios from 'axios'
import style from './index.module.scss'
import { Toast } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
class Headers extends Component {
  state = {
    tabs: [],
    current: 0,
    params: {},
    rank_id: null
  }
  render() {
    return (
      <div className={style.ddiv}>
        <div style={{ position: 'sticky', top: '0' }}>
          <div className={style.div}>
            <ul className={style.ul}>
              {this.state.tabs.map((item, index) => (
                <li
                  key={item.params.sift_factor}
                  className={style.li}
                  onClick={this.header.bind(this, item.params, index)}
                >
                  <span
                    className={this.state.current === index ? style.active : ''}
                    onClick={this.headerclass.bind(this, index)}
                  >
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    Toast.loading('Loading...', 3, () => {})
    axios({
      url: '/restapi/shopping/v1/sale_list_index',
      params: {
        type: 'quality_meal',
        latitude: '38.862191',
        longitude: '121.533722',
        params: {}
      }
    }).then(res => {
      this.setState({
        tabs: res.data.tabs,
        rank_id: res.data.rank_id
      })

      Toast.hide()
    })
  }
  headerclass(index) {
    this.setState({
      current: index
    })
  }
  header(item, data, index) {
    Toast.loading('Loading...', 3, () => {})
    this.setState({
      params: item
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
      this.props.fn(res.data, this.state.rank_id, this.state.params)
      Toast.hide()
    })
  }
}
export default Headers
