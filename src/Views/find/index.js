import React,{Component} from 'react'
import axios from 'axios'
import style from './index.module.scss'
// import {NavLink} from 'react-router-dom'
class Find extends Component{
    state={
        toplist:[],
        middlelist:[],
        bottomlist:[]
    }
    render(){
        return <div className={style.find}>
            <ul className={style.top}>
                {
                    this.state.toplist.map(item=><li key={item.id}>
                        <p>{item.title}</p>
                        <p>{item.subtitle}</p>
                        <img src={this.handlePicture(item.main_pic_hash)} alt={item.title}/>
                    </li>)
                }
            </ul>
            <div className={style.middle}>
                <h3><div></div><div>为你推荐</div><div></div></h3>
                <p>你的口味,我都懂得</p>
                <ul>
                {
                 this.state.middlelist.map(item=><li key={item.food.vfood_id}>  
                    <img src={this.handlePicture(item.food.image_path)} alt={item.food.name}/>
                    <div className={style.shop}>
                        <h4>{item.food.name}</h4>
                        <span>月售{item.food.month_sales}份</span>
                        <span>好评率{item.food.satisfy_rate}%</span>
                        <br/>
                        <span>￥{item.food.price}</span>
                        {item.food.discount_activity?<span>{item.food.discount_activity}</span>:null}
                        <div>{item.food.restaurant_name}</div>
                    </div>
                </li>)   
                }
                </ul>
                <div className={style.more}>查看更多</div>
            </div>
            <div className={style.bottom}>
                <h3><div></div><div>限时豪礼</div><div></div></h3>
                <p>金币换豪礼</p>
                <ul>
                {
                 this.state.bottomlist.map(item=><li key={item.image_hash}>  
                    <img src={this.handlePicture(item.image_hash)} alt={item.corner_marker}/>
                    <div className={style.shop}>
                        <h4>{item.title}</h4>
                        
                        <span>{item.points_required}金币</span>
                        <span>￥{item.original_price}</span>
                        <div>{item.corner_marker}</div>
                    </div>
                </li>)   
                }
                </ul>
                <div className={style.more}>查看更多</div>
            </div>
            <div className={style.fill}></div>
        </div>
    }
    componentDidMount(){
        axios('/restapi/member/v1/discover?platform=1&block_index=0').then(res=>{
            // console.log(res.data[1])
            this.setState({
                toplist:res.data[1]
            })
        })
        axios('/restapi/shopping/v1/find/recommendation?latitude=38.913689&longitude=121.614761&offset=0&limit=6&user_id=568227458').then(res=>{
            // console.log(res.data.items)
            this.setState({
                middlelist:res.data.items
            })
        })
        axios('/restapi/member/gifts/suggest').then(res=>{
            console.log(res.data)
            this.setState({
                bottomlist:res.data
            })
        })
    }
    
   handlePicture(path){
        return `https://fuss10.elemecdn.com/${path.slice(0,1)}/${path.slice(1,3)}/${path.slice(3)}.${path.slice(32)}`
    }
}

export default Find;