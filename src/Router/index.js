// 路由配置文件
import React from 'react';
import { HashRouter as Router, Route,Redirect,Switch } from "react-router-dom";
import Homepage from "../Views/homepage";
import Find from "../Views/find";
import Order from "../Views/order";
import App from "../App";
import Detail from '../Views/detail';
import Search from '../Views/search';
import Quality from '../Views/quality';
import My from '../Views/my';
const router = <Router>
        <App>
            <Switch>
                {
                    //遇到第一个匹配路径的组件 就停止
                }
                <Route path="/homepage" component={Homepage}/>
                {/* <Route path="/film" render={()=>
                    <Film>
                        <Switch>
                            <Route path="/film/nowplaying" component ={Nowplaying}/>
                            <Route path="/film/comingsoon" component = {Comingsoon}/>
                            <Redirect from="/film" to="/film/nowplaying"/>
                        </Switch>
                    </Film>
                }/> */}
                <Route path="/find" component={Find}/>
                <Route path="/order" component={Order}/>
                <Route path="/my" component={My}/>
               
                {/* <Route path="/center" component={Center}/> */}

                {/* 路由拦截 */}
               

                {/* 1- 动态路由配置 */}
                <Route path="/detail/:id" component={Detail}/>
                <Route path="/search" component={Search}/>
                <Route path="/quality" component={Quality}/>
               

                

                {/* 2- query路由配置 */}
                {/* <Route path="/detail" component={Detail}/> */}
                <Redirect from="/" to="/homepage"/>
            </Switch>
        </App>
    </Router>

/*
    react BrowserRouter组件  === Vue history
    react HashRouter 组件   === Vue hash
*/

export default router;