import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import style from './index.module.scss' //webpack css-loader 

class Tabbar extends Component{
    render(){
        return <nav>
            <ul className={style.active}>
                <li><NavLink to="/homepage" activeClassName={style.act} replace>首页</NavLink></li>
                <li><NavLink to="/find" activeClassName={style.act} replace>发现</NavLink></li>
                <li><NavLink to="/order" activeClassName={style.act} replace>订单</NavLink></li>
                <li><NavLink to="/my" activeClassName={style.act} replace>我的</NavLink></li>
            </ul>
        </nav> 
    }
}

export default Tabbar;