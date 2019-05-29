import React,{Component} from 'react'
// import axios from 'axios'
import store from '../../Store'
import {hidetabbar,showTabbar}from '../../Components/actionCreator'
class Detail extends Component{
    state={
        getlist:null
    }
    render(){
        return <div>
           Detail 
        </div>
    }
    componentDidMount(){
        

        store.dispatch(hidetabbar());

        //1- 动态路由接受参数

        // axios.get(`/ajax/detailmovie?movieId=${this.props.match.params.id}`).then(res=>{
        //     console.log(res.data);

        //     this.setState({
        //         filminfo:res.data.detailMovie
        //     })
        // })

        //2- query接受参数
        // console.log(this.props.location.query.kerwinid)
    }
    componentWillUnmount(){
        //发布 显示消息
        // store.publish(true);
        

        store.dispatch(showTabbar());

    }
}

export default Detail;