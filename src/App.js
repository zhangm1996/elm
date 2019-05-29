import React from 'react';
import './App.css';
import Tabbar from './Components/Tabbar'
import store from './Store'
class App extends React.Component{
  state = {
    isShow:store.getState().tabbarReducer
  }


  componentWillMount(){
  
    // 通过subscribe方法 注册回调
    store.subscribe(()=>{
      // console.log("")
      //修改isShow state
      // console.log("app.js",store.getState()); //getState拿到是 store中存的状态值
      this.setState({
        isShow:store.getState().tabbarReducer
      })
    })
  }
  render(){
    return <div>
           {
           this.state.isShow?
           <Tabbar></Tabbar>
           :null
         }
         
         {/* 路由容器 */}
         {
           this.props.children
         }
    </div>
  }
}
export default App