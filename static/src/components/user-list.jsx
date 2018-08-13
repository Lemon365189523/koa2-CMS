import React, {Component} from 'react'; 
import {
    Pagination,
    Table,
    Icon,
    message,
    Modal
} from 'antd';
import Request from "../utils/request"
import {NavLink , Link} from "react-router-dom"


class UserList extends Component {

    constructor(props){
        super(props);
        this.state = {
            queryInfo : {    //设置最初一页显示多少条
                pageSize: 10
            },     
            dataSource:{    //数据存放
                count: 0,    //一共几条数据
                data: [],    //数据
            },
            loading: false,  //Load属性设置
            visible: false, //显示model
            selectModel: {}, //选择的模型

        };
        this.tableColumns = [];  //初始定义表头菜单
    }

    componentWillMount(){
        this._tableColumns();
        this._getDatas(1,this.state.queryInfo.pageSize);
    }

    async _getDatas(page,pageSize){
        let result = await Request.post({
            url: '/api/user/getAllUser.json',
            data: {
                pageIndex: page - 1,
                pageSize: pageSize
            }
          })
        if (result.code == 0) {
            console.log('====================================');
            console.log(result);
            console.log('====================================');
            this.setState({
                queryInfo: {
                    pageSize :pageSize
                },
                dataSource: {
                    count: result.total,
                    data: result.data
                }
            })
        }else if (result.code == 401){
            //去登录
            // this.props.history.push("/admin");
            message.error("token已过期，需要登录")
            window.location.href = "/admin"
        }

    }

    _tableColumns(){
        this.tableColumns = [{
            title: 'id',        //菜单内容
            dataIndex: '_id',   //在数据中对应的属性
            key: '_id'   //key
            }, {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName'
            }, {
            title: '密码',
            dataIndex: 'password',
            key: 'password'
            }, {
            title: '注册时间',
            dataIndex: 'createdAt',
            key: 'createdAt'
            },  {
            title: '操作',
            key: 'operation',
            render: (model) => {
                let data = JSON.stringify(model)
                return( 
                    <span>
                        <NavLink to={`/work/userEdit/${data}`} exact activeClassName="active">编辑</NavLink>

                    　　<a className="delete-data" onClick={this._onClickDelete.bind(this , model)}>删除</a>
                    </span>
                )},
        }]
    }
    //编辑数据
    _onClickEdit(model){
        this.setState({
            selectModel : model
        })
    }
    //删除数据 
    _onClickDelete(model){
        console.log(model)
        this.setState({
            selectModel : model,
            visible: true
        })
    }

    _toSelectChange(currentPage, pageSize){
        //currentPage：当前页   
        this._getDatas(currentPage,pageSize)
    }

    _gotoThispage(current){
        //
        
        this._getDatas(current,this.state.queryInfo.pageSize )
    }

    _showTotalText(){
        return '共 ' + this.state.dataSource.count + ' 条数据'; 
    }

    async _handleOk(){
        let result = await Request.post({
            url: "api/user/deleteUser.json",
            data: {
                userName : this.state.selectModel.userName
            }
        })

        if (result.code == 0){
            message.success(result.msg)
            await this._getDatas(1,this.state.queryInfo.pageSize);
            this.setState({
                visible: false
            })
        }else {
            message.error(result.msg)
            this.setState({
                visible: false
            })
        }

    }

    _handleCancle(){
        this.setState({
            visible: false
        })
    }


    render(){
 
        return (
            <div>
                <Table 
                    dataSource={this.state.dataSource.data} 
                    columns={this.tableColumns} 
                    rowKey={(model) => {
                        return model._id
                    }}
                    pagination={{  //分页
                        total: this.state.dataSource.count, //数据总数量
                        pageSize: this.state.queryInfo.pageSize,  //显示几条一页
                        defaultPageSize: this.state.queryInfo.pageSize, //默认显示几条一页
                        showSizeChanger: true,  //是否显示可以设置几条一页的选项
                         //当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
                        onShowSizeChange:this._toSelectChange.bind(this), 
                        //点击改变页数的选项时调用函数，current:将要跳转的页数
                        onChange: this._gotoThispage.bind(this),                                         
                        showTotal: this._showTotalText.bind(this),

                        pageSizeOptions: ['5','10']
                    }}
                    bordered
                />  
                <Modal 
                    title="删除用户数据"
                    visible={this.state.visible}
                    onOk={this._handleOk.bind(this)}
                    onCancel={this._handleCancle.bind(this)}
                >
                    <p>是否删除用户{this.state.selectModel.userName}数据</p>
                </Modal>
            </div>
        )
    }
}
export default UserList;