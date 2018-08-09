import React, {Component} from 'react'; 
import {
    Pagination,
    Table,
    Icon,
    message
} from 'antd';
import Request from "../utils/request"


class UserList extends Component {

    constructor(props){
        super(props);
        this.state = {
            queryInfo : {    //设置最初一页显示多少条
                　pageSize: 1
            },     
            dataSource:{    //数据存放
                count: 0,    //一共几条数据
                data: [],    //数据
            },
            loading: false  //Load属性设置
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
            render: (model) => (  //塞入内容
            <span>
            　　<a className="edit-data" onClick={this._onClickEdit(model)}>编辑</a>
            　　<a className="delete-data" onClick={this._onClickDelete(model)}>删除</a>
            </span>
            ),
        }]
    }
    //编辑数据
    _onClickEdit(model){

    }
    //删除数据 
    _onClickDelete(model){

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
            </div>
        )
    }
}
export default UserList;