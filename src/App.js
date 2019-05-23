import React from 'react';
import './App.css';
import Tabbar from './Components/Tabbar'
class App extends React.Component{

  render(){
    return <div>
           <Tabbar></Tabbar>
         
         {/* 路由容器 */}
         {
           this.props.children
         }
    </div>
  }
}
export default App