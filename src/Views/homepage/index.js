import React,{Component} from 'react'
import axios from 'axios'
class Homepage extends Component{
    render(){
        return <div>
            Homepage
        </div>
    }
    componentDidMount(){
        axios({
            withCredentials: true,
            url:'/restapi/shopping/v3/restaurants?latitude=38.913689&longitude=121.614761&offset=0&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5' ,
            headers:{
                
            }
        }).then(res=>{
            console.log(res.data)
        })
        axios({
            
            url:'/pizza/shopping/restaurants/batch_filter?latitude=38.913689&longitude=121.614761&terminal=h5' ,
        }).then(res=>{
            console.log(res.data)
        })
    }
}


export default Homepage;