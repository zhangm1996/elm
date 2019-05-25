import React, { Component } from 'react'
import axios from 'axios'
import style from './index.module.scss'
class Section extends Component {
  state = {
    datalist: [],
    isShow: true,
    spanShow: true,
    current: null
  }
  render() {
    return (
      <section className={style.section}>
        <div className={style.juQ4h + ' ' + style._1UG_2}>
          {this.state.datalist.map((item, index) => (
            <section className={style._1ti2W} key={item.foods[0].category_id}>
              <section className={style._3v2Nk}>
                <header className={style._169kA}>
                  <img
                    src={this.handlePicture(item.restaurant.image_path)}
                    className={style._2u1U_}
                    alt="商家图标"
                  />
                  <div className={style._3mt7u}>
                    <h3 className={style.ul}>
                      <span className={style.xqMWg}>
                        {item.foods[0].restaurant_name}
                      </span>
                      <span className={style._2DUP4}>
                        <span>评分{item.restaurant.rating}</span>
                        <span className={style._2_SFv} />
                        <span>
                          {
                            this.handjson(item.restaurant.business_info)
                              .recent_order_num_display
                          }
                        </span>
                      </span>
                    </h3>
                    <ul className={style.ul}>
                      {item.restaurant.recommend_reasons.map(rea => (
                        <li className={style._2sJwH} key={rea.name}>
                          {rea.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </header>
                <ul className={style.ul}>
                  {this.state.current === index ?null:
                  <li className={style._3xqCD} key={item.foods[0].name}>
                    <img
                      alt={item.foods[0].name}
                      className={style._3t8mW}
                      src={this.handlePicture(item.foods[0].image_path)}
                    />
                    <div className={style.JAN9C}>
                      <h4 className={style.VRaJj}>{item.foods[0].name}</h4>
                      <div className={style.McUOa}>
                        {item.foods[0].description}
                      </div>
                      <div className={style.McUOa} />
                      {item.foods[0].reason ? (
                        <div className={style.u7fu8}>人气美食</div>
                      ) : null}
                      <div className={style._3IxAU}>
                        <i>¥</i>
                        <span>{item.foods[0].price}</span>
                        {item.foods[0].discount_activity ? (
                          <span className={style._19si8}>
                            {item.foods[0].discount_activity}
                          </span>
                        ) : (
                          <del>
                            <i>¥</i>
                            <span>{item.foods[0].original_price}</span>
                          </del>
                        )}
                      </div>
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMjEuNzI3IDE4LjA5VjkuOTk1QTEgMSAwIDAgMCAyMC43MzQgOWgtMS42NWEuOTk1Ljk5NSAwIDAgMC0uOTkzLjk5NHY4LjA5N0g5Ljk5NGExIDEgMCAwIDAtLjk5NC45OTR2MS42NDljMCAuNTQ3LjQ0NS45OTMuOTk0Ljk5M2g4LjA5N3Y4LjA5N2ExIDEgMCAwIDAgLjk5NC45OTRoMS42NDlhLjk5NS45OTUgMCAwIDAgLjk5My0uOTk0di04LjA5N2g4LjA5N2ExIDEgMCAwIDAgLjk5NC0uOTkzdi0xLjY1YS45OTUuOTk1IDAgMCAwLS45OTQtLjk5M2gtOC4wOTd6TTIwIDQwQzguOTU0IDQwIDAgMzEuMDQ2IDAgMjBTOC45NTQgMCAyMCAwczIwIDguOTU0IDIwIDIwLTguOTU0IDIwLTIwIDIweiIvPjwvc3ZnPg=="
                        className={style.KhJwn}
                        alt={item.id}
                      />
                    </div>
                  </li>
                    }
                  {this.state.isShow
                    ? null
                    : item.foods.map(data =>
                        this.state.current === index ? (
                          <li className={style._3xqCD} key={data.id}>
                            <img
                              alt={data.name}
                              className={style._3t8mW}
                              src={this.handlePicture(data.image_path)}
                            />
                            <div className={style.JAN9C}>
                              <h4 className={style.VRaJj}>{data.name}</h4>
                              <div className={style.McUOa}>
                                {data.description}
                              </div>
                              <div className={style.McUOa} />
                              {data.reason ? (
                                <div className={style.u7fu8}>人气美食</div>
                              ) : null}
                              <div className={style._3IxAU}>
                                <i>¥</i>
                                <span>{data.price}</span>
                                {/* <span>{data}</span> */}
                                {data.discount_activity ? (
                                  <span className={style._19si8}>
                                    {data.discount_activity}
                                  </span>
                                ) : (
                                  <del>
                                    <i>¥</i>
                                    <span>{data.original_price}</span>
                                  </del>
                                )}
                              </div>
                              <img
                                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMjEuNzI3IDE4LjA5VjkuOTk1QTEgMSAwIDAgMCAyMC43MzQgOWgtMS42NWEuOTk1Ljk5NSAwIDAgMC0uOTkzLjk5NHY4LjA5N0g5Ljk5NGExIDEgMCAwIDAtLjk5NC45OTR2MS42NDljMCAuNTQ3LjQ0NS45OTMuOTk0Ljk5M2g4LjA5N3Y4LjA5N2ExIDEgMCAwIDAgLjk5NC45OTRoMS42NDlhLjk5NS45OTUgMCAwIDAgLjk5My0uOTk0di04LjA5N2g4LjA5N2ExIDEgMCAwIDAgLjk5NC0uOTkzdi0xLjY1YS45OTUuOTk1IDAgMCAwLS45OTQtLjk5M2gtOC4wOTd6TTIwIDQwQzguOTU0IDQwIDAgMzEuMDQ2IDAgMjBTOC45NTQgMCAyMCAwczIwIDguOTU0IDIwIDIwLTguOTU0IDIwLTIwIDIweiIvPjwvc3ZnPg=="
                                className={style.KhJwn}
                                alt={item.id}
                              />
                            </div>
                          </li>
                        ) : null
                      )}
                </ul>

                {item.foods.length > 1 ? (
                  <div className={style._3qUg0}>
                    {item.foods.length === 2 ? (
                      this.state.current === index ? (
                        this.state.spanShow ? (
                          // <span onClick={this.handle.bind(this, index)}>
                          //   收起
                          // </span>:
                          <span onClick={this.handleClick.bind(this, index)}>
                            展开更多套餐 1个
                          </span>
                        ) : (
                          <span onClick={this.handle.bind(this, index)}>
                            收起
                          </span>
                        )
                      ) : (
                        <span onClick={this.handleClick.bind(this, index)}>
                            展开更多套餐 1个
                          </span>
                      )
                    ) : this.state.current === index ? (
                      this.state.spanShow ? (
                        // <span onClick={this.handle.bind(this, index)}>
                        //   收起
                        // </span>:
                        <span onClick={this.handleClick.bind(this, index)}>
                          展开更多套餐 2个
                        </span>
                      ) : (
                        <span onClick={this.handle.bind(this, index)}>
                          收起
                        </span>
                      )
                    ) : (
                      <span onClick={this.handleClick.bind(this, index)}>
                          展开更多套餐 2个
                        </span>
                    )}

                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUBAMAAAAevyJ8AAAAGFBMVEUAAABmZmZnZ2dmZmZnZ2dmZmZmZmaAgICTqrbKAAAACHRSTlMA/lfr6fJLBMT+Jn8AAABhSURBVBjTdcqxDYAwDERRCxDUzgSmoKdgACQ2YAJGYP8KIZ/8C8QVPid+9sl4BI9uu2zwxsfsu/XuUcB9fUcDeOQs0KoA2QCWPEABWgEiAhABiAAkAUQAIkCWM7sy3faTB0qcCfeqJVkUAAAAAElFTkSuQmCC"
                      alt=""
                    />
                  </div>
                ) : (
                  <div className={style._3x4jG} />
                )}
              </section>
            </section>
          ))}
        </div>
      </section>
    )
  }
  handleClick(num) {
    this.setState({
      isShow: false,
      spanShow: false,
      current: num
    })
  }
  handle(num) {
    this.setState({
      isShow: true,
      spanShow: true,
      current: num
    })
  }
  componentDidMount() {
    axios
      .get(
        '/restapi/shopping/v1/sale_list_index?type=quality_meal&latitude=38.862191&longitude=121.533722&params=%7B%7D'
      )
      .then(res => {
        this.setState({
          datalist: res.data.query_list,
          tabs: res.data.tabs
        })
      })
  }
  handlePicture(path) {
    return `https://fuss10.elemecdn.com/${path.slice(0, 1)}/${path.slice(
      1,
      3
    )}/${path.slice(3)}.${path.slice(32, 36)}`
  }
  handjson(path) {
    return JSON.parse(path)
  }
}
export default Section
