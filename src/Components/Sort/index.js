import React,{Component} from 'react'
import style from './index.module.scss'
import axios from 'axios'
class Sort extends Component{
    state={
        sortlist:null,
        number:0,
        isShow:false,
        title:'综合排序',
        choice:true,
        distance:false,
        quality:false,
        screen:false
    }
    render(){
        return <div>
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
                            this.handleClick(index)
                            
                        }}>
                            {item.name}
                    </li>)
                    }
                    </ul>:null}
                </div>
                <div className={`${style.distance} ${this.state.distance?style.colorBlock:null}`} onClick={()=>{
                    this.setState({
                        choice:false,
                        distance:true,
                        quality:false,
                        screen:false
                    })
                }}>{this.state.sortlist.outside_sort_filter[0].name}</div>
                <div className={`${style.quality} ${this.state.quality?style.colorBlock:null}`} onClick={()=>{
                    this.setState({
                        choice:false,
                        distance:false,
                        quality:true,
                        screen:false
                    })
                }}>{this.state.sortlist.outside_filters[0].name}</div>
                <div className={`${style.screen} ${this.state.screen?style.colorBlock:null}`} onClick={()=>{
                    this.setState({
                        choice:false,
                        distance:false,
                        quality:false,
                        screen:true
                    })
                }}>筛选</div>
            </div>:null}
        
        </div>
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
                console.log(res.data.inside_sort_filter)
                this.setState({
                    sortlist:res.data
                    
                })
            }) 
    }
}

export default Sort;