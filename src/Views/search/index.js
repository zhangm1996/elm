import React,{Component} from 'react'
import axios from 'axios'
import style from './index.module.scss'
import {withRouter} from 'react-router'
import {hidetabbar,showTabbar} from '../../Components/actionCreator'
import store from '../../Store'
import {getListPromise} from './actionCreator'
var creatHistory = require("history").createBrowserHistory
class Search extends Component{
    state={
        isShow:store.getState().hotReducer,
        hotlist:[],
        resultlist:[],
        value:''
    }
    render(){
        var myelement = null;
        return <div>
            <div className={style.search}>
                <button onClick={()=>{
                    // this.props.history.push('/homepage')
                    const history = creatHistory();
                    history.goBack();
                }}>后退</button>
                <input type="text" placeholder="输入商家、商品名称" defaultValue={this.state.value} ref={(element)=>myelement = element}/>
                <button onClick={()=>{     
                     this.props.history.push(`/search/result/${myelement.value}`);
                     store.dispatch(getListPromise(myelement.value))
                }}>搜索</button>
            </div>
            {
            this.state.isShow?<div className={style.hot}>
                <h3>热门搜索</h3>
                <ul>
                    {
                        this.state.hotlist.map(item=><li key={item.word} onClick={this.handleChangePage.bind(this,item.word)}>
                                {item.word}
                            </li>
                        )
                    }
                </ul>
            </div>:null
                }
                {
           this.props.children
         }
        </div>
    }
    handlePicture(path){
        return `https://fuss10.elemecdn.com/${path.slice(0,1)}/${path.slice(1,3)}/${path.slice(3)}.${path.slice(32)}`
    }
   
    handleChangePage(word){
        // console.log(this.props);
        this.props.history.push(`/search/result/${word}`);
        this.setState({
            value:word
        })
    }
    componentDidMount(){

        store.subscribe(()=>{
            // console.log("")
            //修改isShow state
            //getState拿到是 store中存的状态值
            this.setState({
              isShow:store.getState().hotReducer
            })
          })
        store.dispatch(hidetabbar());
        axios('/restapi/swarm/v2/hot_search_words?latitude=38.913689&longitude=121.614761').then(res=>{
           
            this.setState({
                hotlist:res.data
            })
        })
    }
    componentWillUnmount(){
        //发布 显示消息
        // store.publish(true);
        store.dispatch(showTabbar());

    }
}

export default withRouter(Search);;