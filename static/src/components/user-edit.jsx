import React, {Component} from 'react'
import {
    Button,
    List,
    Input,
    Row,
    Col,
    message
} from 'antd'
import Request from '../utils/request'

class UserEdit extends Component {

    constructor(props){
        super(props)
        this.state = {
            value : ""
        }
    }

    componentDidMount() {
        const data = this.props.match.params.data;
        const userModel = JSON.parse(data);
        this.setState({
            value : userModel.password
        })
    }

    async _saveUser(){
        const data = this.props.match.params.data;
        const userModel = JSON.parse(data);
        const newPassword = this.state.value
         
        if (newPassword == userModel.password){
            message.error('密码没有变化!')
            return
        }
        let result = await Request.post({
            url : "/api/user/updateUser.json",
            data: {
                userName: userModel.userName,
                newPassword: newPassword
            }
        })

        if (result.code == 1){
            message.error(result.msg)
        }else {
            message.success(result.msg)
            this.props.history.goBack()
        }
        
    }

    _onChange(e){
        this.setState({
            value : e.target.value
        })
    }

    render(){

        //data放在match中
        const data = this.props.match.params.data
        const userModel = JSON.parse(data)
        
        return(
            <div>
                编辑用户信息
                <Row type="flex" justify="start" style={{padding:"20px"}}>
                    <Col span={2}>
                        用户名 :
                    </Col>
                    <Col span={4}>
                        {userModel.userName}
                    </Col>
                    
                </Row>
                <Row type="flex" justify="start" style={{padding:"20px"}}>
                    <Col span={2}>
                        密  码 :
                     </Col>
                    <Col span={4}>
                        <Input defaultValue={userModel.password} 
                            onChange={this._onChange.bind(this)}
                        />
                    </Col>
                    
                </Row>
                <Button style={{margin: "20px"}} 
                    type="primary" 
                    onClick={this._saveUser.bind(this)}
                >
                    保存
                </Button>
            </div>
        )
    }
}

export default UserEdit 