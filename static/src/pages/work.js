import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import App from './../apps/work.jsx'
import {Router, Route} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import UserList from '../components/user-list'

class RouterIndex extends Component {
    render(){
      return(
          <BrowserRouter>
            <App path="/work" component={App}>
                <Route path='/work/userlist' component={UserList}/>
            </App>
          </BrowserRouter>
      )
    }
}
 
ReactDOM.render( <RouterIndex />,
  document.getElementById("app"))