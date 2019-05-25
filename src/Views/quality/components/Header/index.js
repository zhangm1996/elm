import React, { Component } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import style from './index.module.scss'
class Headers extends Component {
  state = {
    tabs: [],
    current:0
  }
  render() {
    return (
      <div>
      <div style={{ position: 'sticky', top: '0' }}>
        <div className={style.div}>
          <ul className={style.ul}>
            {this.state.tabs.map((item,index) => (
              <li key={item.params.sift_factor} className={style.li} >
                <NavLink
                  activeClassName={style.active}
                  to={'/quality/' + item.name}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
           
          </ul>
        </div>
      </div>
      </div>
    )
  }
  componentDidMount() {
    axios
      .get(
        '/restapi/shopping/v1/sale_list_index?type=quality_meal&latitude=38.862191&longitude=121.533722&params=%7B%7D'
      )
      .then(res => {
       
        this.setState({
          tabs: res.data.tabs
        })
      })
  }

}
export default Headers
