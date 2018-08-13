import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import App from './../apps/work.jsx'
import { Route } from 'react-router'
import {BrowserRouter, Switch } from 'react-router-dom'
import UserList from '../components/user-list'
import UserEdit from '../components/user-edit'

class RouterIndex extends Component {
    render(){
      return(
            <App >
                <BrowserRouter> 
                {/* 当一个<Switch>组件被渲染时，react只会渲染Switch下与当前路径匹配的第一个子<Route> */}
                  <Switch>
                    <Route exact path='/work' component={UserList}/>
                    <Route path='/work/userEdit/:data' component={UserEdit}/>

                  </Switch>
                </BrowserRouter>
            </App>
      )
    }
}
 
ReactDOM.render( <RouterIndex />,
  document.getElementById("app"))