import React from 'react'
import { Layout, Menu, Icon, Button } from 'antd'
import UserList from '../components/user-list'
const { Header, Sider, Content } = Layout


class Work extends React.Component {
  state = {
    collapsed: false,
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  _logout(){
      //清空token localStorage.setItem('user-token', result.token);
      localStorage.removeItem('user-token')
      window.location.href = "/admin"
  }

  render() {
    return (
        <Layout style={{ height: '100%' }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span className="nav-text">系统用户</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span className="nav-text">app1</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span className="nav-text">app2</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 20,justifyContent:'space-between',display:'flex',alignContent:'center'}}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <Button onClick={this._logout.bind(this)}>
                退出系统
              </Button>
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              {/* <UserList /> */}
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
    )
  }
}


export default Work