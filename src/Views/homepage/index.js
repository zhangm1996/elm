import React,{Component} from 'react'
import axios from 'axios'
import style from './index.module.scss'
import {Carousel} from 'antd-mobile'
import {PullToRefresh,ListView} from 'antd-mobile';


class Homepage extends Component{
   
    state= {
        datalist:[],
        discountlist:[],
        restaurantlist:[],
        isfixed:false,
        offset:0,
        Show:false,
        sortlist:null,
        number:0,
        isShow:false,
        title:'综合排序',
        choice:true,
        distance:false,
        quality:false,
        screen:false,
        refreshing:false

    }
    handlePicture(path){
        return `https://fuss10.elemecdn.com/${path.slice(0,1)}/${path.slice(1,3)}/${path.slice(3)}.${path.slice(32)}`
    }
   
    render(){ 
        return <div>
         
            <div className={`${style.backTop} ${this.state.Show?null:style.show}`} onClick={()=>{
               document.documentElement.scrollTop =0 
            }}>返回顶部</div>
            <div className={style.title1} ref='title'>
                <p>中海·华庭</p>
            </div>
            <div className={`${style.title2} ${this.state.isfixed?style.fixed:null}`} onClick={()=>{
                 this.props.history.push(`/search`);
            }}>
                <div className={style.search}>
                    搜索饿了么商家、商品名称
                </div>
            </div>
            
            <div className={style.main}>
            <Carousel infinite>
                <div className={style.bar}>
                {
                    this.state.datalist.map((item,index)=>(index<10)?<div key={item.id}>
                    <img src={this.handlePicture(item.image_hash)} alt={item.name_color} />
                    <p>{item.name}</p>
                    </div> :null
                        )
                }
                </div>
                <div className={style.bar}>
                {
                    this.state.datalist.map((item,index)=>(index>10)?<div key={item.id}>
                    <img src={this.handlePicture(item.image_hash)} alt={item.name_color} />
                    <p>{item.name}</p>
                    </div> :null
                        )
                }
                </div>
                </Carousel>
            </div>
         
            
            <div className={style.setmeal} onClick={()=>{
              this.props.history.push(`/quality`);  
            }}>
                <div className={style.setmeal_words}>
                    <h3>品质套餐</h3>
                    <div className={style.collocation}>搭配齐全吃得好</div>
                    <div className={style.buy}>立即抢购 ></div>
                </div>
                <div className={style.setmeal_img}>
                <img src="https://fuss10.elemecdn.com/e/ee/df43e7e53f6e1346c3fda0609f1d3png.png?imageMogr/format/webp/thumbnail/!282x188r/gravity/Center/crop/282x188/" alt=""/>
                </div>
            </div>
            <div className={style.vip}>
                <img src="https://fuss10.elemecdn.com/8/0e/4dd212d831becab6e3ebd484c0941jpeg.jpeg?imageMogr/format/webp/thumbnail/34x/" alt=""/>
                <span>超级会员</span>
                <span>每月领20元红包</span>
                <span>立即开通></span>    
            </div>
            <div>
                <Carousel autoplay infinite>
                    {
                        this.state.discountlist.map(item=>
                            <img src={this.handlePicture(item.image_hash)} key={item.id} alt={item.banner_type}/>
                            )
                    }
                </Carousel>
            </div>
            <div className={style.title3}>推荐商家</div>
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
                            axios(`/restapi/shopping/v3/restaurants?latitude=38.913689&longitude=121.614761&offset=0&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&order_by=${item.value}&rank_id=&terminal=h5`).then(res=>{
                              
                                this.setState({
                                    restaurantlist:res.data.items,
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
                    axios({
                        url:`/restapi/shopping/v3/restaurants?latitude=38.913689&longitude=121.614761&offset=0&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&order_by=5&rank_id=&terminal=h5`,
                        headers:{
                            'X-Shard': 'loc=121.522915,38.866091',
                            'x-uab': '118#ZVWZzm4v+L7emeXkBHR1ZYquZYT4zHWzZgC2Voq4m+yXIAgTyHRVPgZuusqhzeWZZZZZXoqVzeAuZZZh0HWWGcb/ZzqTqhZzZgeCc5qVzHZzZeZTVHRVZZZuZwqhzeWzZZZuXTbVzHZzZeZhTgKfgH2Z5Nh6DwmYtHFUpoq4cAIJ+MxM0ZS4NX6g9R3sAl0KDrWPB9Q4XrD8syKkgqDRM5kU86EE2JcG/bBgf/4uM55Mq66ZQ+nUA1U1QutxRJFZw3GCZmbe5PB0FZvBfsk+dHHfUZfnOzYhPDs1STVBw3OzzJlXumoKfUYEQRebagm1Htk1AHyZiPcSFI+B/ssFwnXm9AJqCgVaAVBUBdKn07/2UyroWLNJ7x+tUdgQ1LWQA2ALweUli92ynZG0QIkvbzEXEGz6Uub3JNmeMCvZxF0/dkYbk5VZXu/FFAdNWQa++Q1fhlZvs8PvZe/TuvPiz0MpVwxr3FfcLLd20jv2P9iF0kN9B/M4F8PpyoOyvcJWPmeVxmVFUqTa7sf5JxDJXoYHKGYZDlMiKrwRcoFh4hekYf76/47EEezu+v1Uv/uyLZsJ1GM5I4rChlONWf5uUbNjXm3/GgBdVA9z+5XvbQRZlPjiqicWWOOArqpHbd8GRaqcOQiy2QRWmJCbzmhh2miDQWf7K5AcFQgOm5LIg3PE6y21HER4DDayeh7gsRqT6JitRJAHzPy7HGh0OGm5lK4d/4l5Txyn6WVSsCE0lfOuozTLNVqAbEdkp/pRI+X7HLN7ZZe3L4PXZZxqMgS/37noZYiP+7stMItYFxTQPXQz85IvybwGBXO6+B6KoxQVJp9d9A882161eKLR/C9mbmz1jd/lEh3hhiW8ZD2PCI77JnOtwrwjo4NmlAQ4mdTweBb+5jJfBNRClLsOaOJXGfU1FoOG4jvejqeNA9SWgEwcAe799XmqizUQEyvuPMutdJrpB4O5QsQEr/Yrrlb06Yj/8LQwA34wmarKzAyq/xOdis3f5x7HwvtBqCoBPi3UrtbwWvL61pSejW1lP/JOnb+b/gNifLbrgPDdiPDv6AWSeyHVqvtx3gKmCPtUuPpl1ld8tMeYoIid7VUb5Sjfaamu3bqRZT1+coiwOQsk1EVHhcF3CYMNb4EOAHPX7RUIVTb5CmHPW+hV5P86QM3MqFq6xRfT3c/0C0JpEEw80bfYQNH3MMXLLd7FHgdEJdt8Ahm0tKUubDCus8YdCo+0Fw87NXulTHIcjIf+GxbbFnMv58l0dHZSGqtlOoTlo/w+X4gYtdO7Q8QhYo+ujknTg0xcu7MWFO4qpcIdqHBAb9fuZs1u1F+14hpCb+DddtDzHcZVSO6kDH=='
                        }
                    }).then(res=>{
                        
                        this.setState({
                            restaurantlist:res.data.items,
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
                    axios({
                        url:`/restapi/shopping/v3/restaurants?latitude=38.913689&longitude=121.614761&offset=0&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&quality_union=1&rank_id=&terminal=h5`,
                        headers:{
                            'X-Shard': 'loc=121.522915,38.866091',
                            'x-uab': '118#ZVWZzm4v+L7emeXkBHR1ZYquZYT4zHWzZgC2Voq4m+yXIAgTyHRVPgZuusqhzeWZZZZZXoqVzeAuZZZh0HWWGcb/ZzqTqhZzZgeCc5qVzHZzZeZTVHRVZZZuZwqhzeWzZZZuXTbVzHZzZeZhTgKfgH2Z5Nh6DwmYtHFUpoq4cAIJ+MxM0ZS4NX6g9R3sAl0KDrWPB9Q4XrD8syKkgqDRM5kU86EE2JcG/bBgf/4uM55Mq66ZQ+nUA1U1QutxRJFZw3GCZmbe5PB0FZvBfsk+dHHfUZfnOzYhPDs1STVBw3OzzJlXumoKfUYEQRebagm1Htk1AHyZiPcSFI+B/ssFwnXm9AJqCgVaAVBUBdKn07/2UyroWLNJ7x+tUdgQ1LWQA2ALweUli92ynZG0QIkvbzEXEGz6Uub3JNmeMCvZxF0/dkYbk5VZXu/FFAdNWQa++Q1fhlZvs8PvZe/TuvPiz0MpVwxr3FfcLLd20jv2P9iF0kN9B/M4F8PpyoOyvcJWPmeVxmVFUqTa7sf5JxDJXoYHKGYZDlMiKrwRcoFh4hekYf76/47EEezu+v1Uv/uyLZsJ1GM5I4rChlONWf5uUbNjXm3/GgBdVA9z+5XvbQRZlPjiqicWWOOArqpHbd8GRaqcOQiy2QRWmJCbzmhh2miDQWf7K5AcFQgOm5LIg3PE6y21HER4DDayeh7gsRqT6JitRJAHzPy7HGh0OGm5lK4d/4l5Txyn6WVSsCE0lfOuozTLNVqAbEdkp/pRI+X7HLN7ZZe3L4PXZZxqMgS/37noZYiP+7stMItYFxTQPXQz85IvybwGBXO6+B6KoxQVJp9d9A882161eKLR/C9mbmz1jd/lEh3hhiW8ZD2PCI77JnOtwrwjo4NmlAQ4mdTweBb+5jJfBNRClLsOaOJXGfU1FoOG4jvejqeNA9SWgEwcAe799XmqizUQEyvuPMutdJrpB4O5QsQEr/Yrrlb06Yj/8LQwA34wmarKzAyq/xOdis3f5x7HwvtBqCoBPi3UrtbwWvL61pSejW1lP/JOnb+b/gNifLbrgPDdiPDv6AWSeyHVqvtx3gKmCPtUuPpl1ld8tMeYoIid7VUb5Sjfaamu3bqRZT1+coiwOQsk1EVHhcF3CYMNb4EOAHPX7RUIVTb5CmHPW+hV5P86QM3MqFq6xRfT3c/0C0JpEEw80bfYQNH3MMXLLd7FHgdEJdt8Ahm0tKUubDCus8YdCo+0Fw87NXulTHIcjIf+GxbbFnMv58l0dHZSGqtlOoTlo/w+X4gYtdO7Q8QhYo+ujknTg0xcu7MWFO4qpcIdqHBAb9fuZs1u1F+14hpCb+DddtDzHcZVSO6kDH=='
                        }
                }).then(res=>{
                        this.setState({
                            restaurantlist:res.data.items,
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
            <PullToRefresh 
                damping={60}
                style={{
                    height: document.documentElement.clientHeight,
                overflow: 'auto',
                }}
                
                direction={'up'}
                refreshing={this.state.refreshing}
                onRefresh={() => {
                    
                    this.setState({ 
                        refreshing: true ,
                        offset:this.state.offset +8
                    });
                 

                   axios({
                    withCredentials: true,
                   
                    url:`/restapi/shopping/v3/restaurants?latitude=38.913689&longitude=121.614761&offset=${this.state.offset}&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=f4bdd37209b54c36a0af673847fe9cf5&terminal=h5` ,
                    headers:{
                        'X-Shard': 'loc=121.522915,38.866091',
                        'x-uab': '118#ZVWZzm4v+L7emeXkBHR1ZYquZYT4zHWzZgC2Voq4m+yXIAgTyHRVPgZuusqhzeWZZZZZXoqVzeAuZZZh0HWWGcb/ZzqTqhZzZgeCc5qVzHZzZeZTVHRVZZZuZwqhzeWzZZZuXTbVzHZzZeZhTgKfgH2Z5Nh6DwmYtHFUpoq4cAIJ+MxM0ZS4NX6g9R3sAl0KDrWPB9Q4XrD8syKkgqDRM5kU86EE2JcG/bBgf/4uM55Mq66ZQ+nUA1U1QutxRJFZw3GCZmbe5PB0FZvBfsk+dHHfUZfnOzYhPDs1STVBw3OzzJlXumoKfUYEQRebagm1Htk1AHyZiPcSFI+B/ssFwnXm9AJqCgVaAVBUBdKn07/2UyroWLNJ7x+tUdgQ1LWQA2ALweUli92ynZG0QIkvbzEXEGz6Uub3JNmeMCvZxF0/dkYbk5VZXu/FFAdNWQa++Q1fhlZvs8PvZe/TuvPiz0MpVwxr3FfcLLd20jv2P9iF0kN9B/M4F8PpyoOyvcJWPmeVxmVFUqTa7sf5JxDJXoYHKGYZDlMiKrwRcoFh4hekYf76/47EEezu+v1Uv/uyLZsJ1GM5I4rChlONWf5uUbNjXm3/GgBdVA9z+5XvbQRZlPjiqicWWOOArqpHbd8GRaqcOQiy2QRWmJCbzmhh2miDQWf7K5AcFQgOm5LIg3PE6y21HER4DDayeh7gsRqT6JitRJAHzPy7HGh0OGm5lK4d/4l5Txyn6WVSsCE0lfOuozTLNVqAbEdkp/pRI+X7HLN7ZZe3L4PXZZxqMgS/37noZYiP+7stMItYFxTQPXQz85IvybwGBXO6+B6KoxQVJp9d9A882161eKLR/C9mbmz1jd/lEh3hhiW8ZD2PCI77JnOtwrwjo4NmlAQ4mdTweBb+5jJfBNRClLsOaOJXGfU1FoOG4jvejqeNA9SWgEwcAe799XmqizUQEyvuPMutdJrpB4O5QsQEr/Yrrlb06Yj/8LQwA34wmarKzAyq/xOdis3f5x7HwvtBqCoBPi3UrtbwWvL61pSejW1lP/JOnb+b/gNifLbrgPDdiPDv6AWSeyHVqvtx3gKmCPtUuPpl1ld8tMeYoIid7VUb5Sjfaamu3bqRZT1+coiwOQsk1EVHhcF3CYMNb4EOAHPX7RUIVTb5CmHPW+hV5P86QM3MqFq6xRfT3c/0C0JpEEw80bfYQNH3MMXLLd7FHgdEJdt8Ahm0tKUubDCus8YdCo+0Fw87NXulTHIcjIf+GxbbFnMv58l0dHZSGqtlOoTlo/w+X4gYtdO7Q8QhYo+ujknTg0xcu7MWFO4qpcIdqHBAb9fuZs1u1F+14hpCb+DddtDzHcZVSO6kDH=='
                    }
                }).then(res=>{
                   
                    this.setState({
                        refreshing: false,
                        restaurantlist:[...this.state.restaurantlist,...res.data.items] 
                    })
                })
                }}
            >
            <ul className={style.home_filter}>
                 {
                    this.state.restaurantlist.map(item=><li key={item.restaurant.id} className={style.block} onClick={this.handlejump.bind(this,item.restaurant.id)}>
                        <img className={style.left} src={this.handlePicture(item.restaurant.image_path)} alt={item.restaurant.name}/>
                        <div className={style.right}>
                    <h3>{item.restaurant.is_star?<span>品牌</span>:null}{item.restaurant.name}</h3>
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
                            {item.restaurant.support_tags.map(item=><li key={item.text} style={{borderColor:`#${item.border}`}}>
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
                        </div>

                    </li>)
                 }
                
            </ul>
            </PullToRefresh>  
            </div>
    }
    handlejump(id){
        this.props.history.push(`/detail/${id}`);
        
    }
    
    handleClick(index){
        this.setState({
            number:index,
            isShow:false,
            title:this.state.sortlist.inside_sort_filter[index].name
        })
    }
    componentDidMount(){
        axios('/restapi/shopping/v1/restaurants/outside_filter/attributes?latitude=38.913689&longitude=121.614761&terminal=h5').then(res=>{
            
            this.setState({
                sortlist:res.data
                
            })
        })    
       window.onscroll = ()=>{   
    
        if( (document.documentElement.scrollTop || document.body.scrollTop) >= this.refs.title.offsetHeight){
            // console.log("吸顶了")
            this.setState({
                isfixed:true
            })
            
        }else{
            // console.log("不吸顶")
            this.setState({
                isfixed : false
            })
        }
        if((document.documentElement.scrollTop || document.body.scrollTop) >=300){
            this.setState({
                Show:true
            })
        }else{
            this.setState({
                Show:false
            })
        }
       }
        axios({
            url:'/restapi/shopping/v2/entries?latitude=38.866091&longitude=121.522915&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template&terminal=h5'
        }).then(res=>{
     
            this.setState({
                datalist:res.data[0].entries
            })
        })
        axios({
            withCredentials: true,
            url:'/restapi/shopping/v3/restaurants?latitude=38.866091&longitude=121.522915&offset=0&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5' ,
            headers:{
                'X-Shard': 'loc=121.522915,38.866091',
                'x-uab': '118#ZVWZzm4v+L7emeXkBHR1ZYquZYT4zHWzZgC2Voq4m+yXIAgTyHRVPgZuusqhzeWZZZZZXoqVzeAuZZZh0HWWGcb/ZzqTqhZzZgeCc5qVzHZzZeZTVHRVZZZuZwqhzeWzZZZuXTbVzHZzZeZhTgKfgH2Z5Nh6DwmYtHFUpoq4cAIJ+MxM0ZS4NX6g9R3sAl0KDrWPB9Q4XrD8syKkgqDRM5kU86EE2JcG/bBgf/4uM55Mq66ZQ+nUA1U1QutxRJFZw3GCZmbe5PB0FZvBfsk+dHHfUZfnOzYhPDs1STVBw3OzzJlXumoKfUYEQRebagm1Htk1AHyZiPcSFI+B/ssFwnXm9AJqCgVaAVBUBdKn07/2UyroWLNJ7x+tUdgQ1LWQA2ALweUli92ynZG0QIkvbzEXEGz6Uub3JNmeMCvZxF0/dkYbk5VZXu/FFAdNWQa++Q1fhlZvs8PvZe/TuvPiz0MpVwxr3FfcLLd20jv2P9iF0kN9B/M4F8PpyoOyvcJWPmeVxmVFUqTa7sf5JxDJXoYHKGYZDlMiKrwRcoFh4hekYf76/47EEezu+v1Uv/uyLZsJ1GM5I4rChlONWf5uUbNjXm3/GgBdVA9z+5XvbQRZlPjiqicWWOOArqpHbd8GRaqcOQiy2QRWmJCbzmhh2miDQWf7K5AcFQgOm5LIg3PE6y21HER4DDayeh7gsRqT6JitRJAHzPy7HGh0OGm5lK4d/4l5Txyn6WVSsCE0lfOuozTLNVqAbEdkp/pRI+X7HLN7ZZe3L4PXZZxqMgS/37noZYiP+7stMItYFxTQPXQz85IvybwGBXO6+B6KoxQVJp9d9A882161eKLR/C9mbmz1jd/lEh3hhiW8ZD2PCI77JnOtwrwjo4NmlAQ4mdTweBb+5jJfBNRClLsOaOJXGfU1FoOG4jvejqeNA9SWgEwcAe799XmqizUQEyvuPMutdJrpB4O5QsQEr/Yrrlb06Yj/8LQwA34wmarKzAyq/xOdis3f5x7HwvtBqCoBPi3UrtbwWvL61pSejW1lP/JOnb+b/gNifLbrgPDdiPDv6AWSeyHVqvtx3gKmCPtUuPpl1ld8tMeYoIid7VUb5Sjfaamu3bqRZT1+coiwOQsk1EVHhcF3CYMNb4EOAHPX7RUIVTb5CmHPW+hV5P86QM3MqFq6xRfT3c/0C0JpEEw80bfYQNH3MMXLLd7FHgdEJdt8Ahm0tKUubDCus8YdCo+0Fw87NXulTHIcjIf+GxbbFnMv58l0dHZSGqtlOoTlo/w+X4gYtdO7Q8QhYo+ujknTg0xcu7MWFO4qpcIdqHBAb9fuZs1u1F+14hpCb+DddtDzHcZVSO6kDH=='
            }
        }).then(res=>{
         
            this.setState({
                restaurantlist:res.data.items
            })
        })
        axios({
            url:'/pizza/shopping/restaurants/batch_filter?latitude=38.913689&longitude=121.614761&terminal=h5' ,
        }).then(res=>{
          
        })
        axios({
            url:'/restapi/shopping/v2/banners?consumer=1&type=1&latitude=38.866091&longitude=121.522915'
        }).then(res=>{
            
            this.setState({
                discountlist:res.data
            })
        })
    }
    componentWillUnmount(){
        window.onscroll = null
    }
}
       

export default Homepage;