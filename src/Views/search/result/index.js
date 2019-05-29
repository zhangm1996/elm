import React,{Component} from 'react'
import style from './index.module.scss'
import axios from 'axios'
import store from '../../../Store'
import {hidehot,showhot} from './actionCreator'
import {PullToRefresh} from 'antd-mobile';
// import Sort from "../../../Components/Sort"
class Result extends Component{
    state={
        resultlist:[],
        look:'查看其它相关商品',
        isChange:false,
        sortlist:null,
        number:0,
        isShow:false,
        title:'综合排序',
        choice:true,
        distance:false,
        quality:false,
        screen:false,
        keyword:null,
        offset:0,
        num:0
        
    }
    render(){
        return <div>
            <PullToRefresh
                damping={60}
                style={{
                    height: 750,
                overflow: 'auto',
                }}
                
                direction={'up'}
                refreshing={this.state.refreshing}
                onRefresh={() => {
                    this.setState({ 
                        refreshing: true ,
                        offset:this.state.offset +15
                    });
                   axios({     
                    url:`/restapi/shopping/v2/restaurants/search?offset=${this.state.offset}&limit=15&keyword=${this.state.keyword}&latitude=38.913689&longitude=121.614761&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5` 
                }).then(res=>{
                    console.log(res.data.inside[0].restaurant_with_foods)
                    this.setState({
                        refreshing: false,
                        resultlist:[...this.state.resultlist,...res.data.inside[0].restaurant_with_foods] 
                    })
                })
                }}
            >
            {
            this.state.sortlist?<div className={style.sort}>
             
                <div className={`${style.choice} ${this.state.choice?style.colorBlock:null}`} onClick={()=>{
                    this.setState({
                        choice:true,
                        distance:false,
                        quality:false,
                        screen:false
                    })
                }}>
                    <p onClick={()=>{
                        this.setState({
                            isShow:!this.state.isShow
                        })
                        }}>{this.state.title}</p>
                    {this.state.isShow?<ul>
                    {
                        this.state.sortlist.inside_sort_filter.map((item,index)=><li key={item.value} className=
                        {index===this.state.number?style.active:null} onClick={()=>{
                            axios(`/restapi/shopping/v2/restaurants/search?offset=0&limit=15&keyword=${this.state.keyword}&latitude=38.913689&longitude=121.614761&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5&order_by=${item.value}`).then(res=>{
                                console.log(res.data.inside[0].restaurant_with_foods)
                                this.setState({
                                    resultlist:res.data.inside[0].restaurant_with_foods,
                                    // isShow:false
                                })
                            }) 
                            this.handleClick(index)
                            
                        }}>
                            {item.name}
                    </li>)
                    }
                    </ul>:null}
                </div>
                <div className={`${style.distance} ${this.state.distance?style.colorBlock:null}`} onClick={()=>{
                    axios(`/restapi/shopping/v2/restaurants/search?offset=0&limit=15&keyword=${this.state.keyword}&latitude=38.913689&longitude=121.614761&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5&order_by=5`).then(res=>{
                        console.log(res.data.inside[0].restaurant_with_foods)
                        this.setState({
                            resultlist:res.data.inside[0].restaurant_with_foods,
                            // isShow:false
                        })
                    })
                    this.setState({
                        choice:false,
                        distance:true,
                        quality:false,
                        screen:false,
                        isShow:false
                    })
                }}>{this.state.sortlist.outside_sort_filter[0].name}</div>
                <div className={`${style.quality} ${this.state.quality?style.colorBlock:null}`} onClick={()=>{
                    axios(`/restapi/shopping/v2/restaurants/search?offset=0&limit=15&keyword=${this.state.keyword}&latitude=38.913689&longitude=121.614761&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5&quality_union=1`).then(res=>{
                        this.setState({
                            resultlist:res.data.inside[0].restaurant_with_foods,
                            // isShow:false
                        })
                    })
                    this.setState({
                        choice:false,
                        distance:false,
                        quality:true,
                        screen:false,
                        isShow:false
                    })
                }}>{this.state.sortlist.outside_filters[0].name}</div>
                <div className={`${style.screen} ${this.state.screen?style.colorBlock:null}`} onClick={()=>{
                    this.setState({
                        choice:false,
                        distance:false,
                        quality:false,
                        screen:true,
                        isShow:false
                    })
                }}>筛选</div>
            </div>:null}
           <ul className={style.result}>
                {
                    this.state.resultlist.map((item,key)=><li key={item.restaurant.id} className={style.block}>
                        <img className={style.left} src={this.handlePicture(item.restaurant.image_path)} alt={item.restaurant.name}/>
                        <div className={style.right}>
                            <h3>{item.restaurant.name}</h3>
                            <div className={style.star}>
                                <div className={style.box}>
                                    <div className={style.one}>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU0LjAxNyA4LjA3MmwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNTMuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0tNDggMEwzLjQ2NSA5LjYzM2MtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBMNy41NSAzLjM1MmwyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNkw4LjQ5NyA2LjI2OWwuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0wxNy42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDI5LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNDEuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2eiIgZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+" alt='提示'/>
                                    </div>
                                    <div className={style.two} style={{width:item.restaurant.rating/5*100+'%'}}>
                                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeDI9IjEwMCUiIHkyPSI1MCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjRkZERTAwIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI0ZGQjAwMCIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZD0iTTU0LjAxNyA4LjA3MmwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNTMuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0tNDggMEwzLjQ2NSA5LjYzM2MtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBMNy41NSAzLjM1MmwyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNkw4LjQ5NyA2LjI2OWwuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0wxNy42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDI5LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNDEuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2eiIgZmlsbD0idXJsKCNhKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+" alt='提示'/>
                                    </div>
                                </div>
                                <p>{item.restaurant.rating}</p>
                                <p>月售{item.restaurant.recent_order_num}单</p>
                            </div>
                            <div className={style.send}>
                                <div>
                                    <p>￥{item.restaurant.float_minimum_order_amount}起送</p>
                                    <span>|</span>
                                    <p>{item.restaurant.piecewise_agent_fee.tips}</p>
                                </div>
                                <div>
                                <p>{item.restaurant.distance}m</p>
                                <span>|</span>
                                <p>{item.restaurant.order_lead_time}分钟</p>
                                </div>
                            </div>
                            <ul className={style.support_tags}>
                            {item.restaurant.support_tags.map(item=><li key={item.color}>
                                {item.text}
                            </li>)}
                            </ul>
                            <ul className={style.activities}>
                            {item.restaurant.activities.map(item=><li key={item.id}>
                                <span style={{background:`#${item.icon_color}`}}>{item.icon_name}</span>
                                <span>
                                    {item.description}
                                </span>
                            </li>)} 
                            </ul>
                            <ul className={style.foods}>
                            {item.foods.map((item,index)=>index<3||(this.state.isChange&&this.state.num===key)?<li key={item.id}>
                                <img src={this.handlePicture(item.image_path)} alt='提示'/>
                                <p>{item.name}</p>
                                <p>￥{item.price}</p>
                            </li>:null)} 
                            {item.foods.length>3?<li className={style.look} onClick={()=>{
                                
                                this.handleLook(key)
                            }
                                
                                
                               }>{this.state.isChange&&this.state.num===key?'收起':'查看其它相关商品'}</li>:null}
                            </ul>
                        </div>

                    </li>)
                }
            </ul>
            </PullToRefresh>   
        </div>
    }
    
    handleLook(key){
        this.setState({
            num:key,
          
            isChange:!this.state.isChange
        })
    }
    handleClick(index){
        this.setState({
            number:index,
            isShow:false,
            title:this.state.sortlist.inside_sort_filter[index].name
        })
    }
    componentWillMount(){
        this.setState({
            keyword:encodeURI(this.props.match.params.id)
        })
    }
    componentDidMount(){  
        store.subscribe(()=>{
            // console.log("")
            //修改isShow state
            // console.log("youma",store.getState().listReducer); //getState拿到是 store中存的状态值
            this.setState({
                resultlist:store.getState().listReducer,
                keyword:encodeURI(this.props.match.params.id)
            })
          })
        store.dispatch(hidehot());
        axios('/restapi/shopping/v1/restaurants/outside_filter/attributes?latitude=38.913689&longitude=121.614761&terminal=h5').then(res=>{
           
            this.setState({
                sortlist:res.data
                
            })
        }) 
        axios(`/restapi/shopping/v2/restaurants/search?offset=0&limit=15&keyword=${this.state.keyword}&latitude=38.913689&longitude=121.614761&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`).then(res=>{
            let result = res.data.inside[0]?res.data.inside[0].restaurant_with_foods:res.data.inside[1].restaurant_with_foods
           console.log(result)
            this.setState({
                resultlist:result
            })
        })     
    }
    componentWillUnmount(){
        //发布 显示消息
        // store.publish(true);
        store.dispatch(showhot());
    }
    handlePicture(path){
        return `https://fuss10.elemecdn.com/${path.slice(0,1)}/${path.slice(1,3)}/${path.slice(3)}.${path.slice(32)}`
    }
}
export default Result;