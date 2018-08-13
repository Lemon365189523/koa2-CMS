import React, {Component} from 'react'
import {
    Button,
    List,
    Input
} from 'antd'

class UserEdit extends Component {

    

    render(){

        //data放在match中
        const data = this.props.match.params.data
        const userModel = JSON.parse(data)
        console.log(userModel);
        
        return(
            <div>
                编辑用户信息
                <div style={{padding:"20px"}}>
                    用户名 :{userModel.userName}
                </div>
                <div style={{padding:"20px",flexDirection: 'column',display: 'flex',}}>
                    <div>密  码 : </div>
                    <Input defaultValue={userModel.password}/>
                </div>
                <Button>保存</Button>
            </div>
        )
    }
}

export default UserEdit