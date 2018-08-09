import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Menu, Breadcrumb,Button } from 'antd'
import HeadeNav from './../components/header-nav.jsx'
import FooterCommon from './../components/footer-common.jsx'


import 'antd/lib/layout/style/css'

const { Header, Content, Footer } = Layout

class App extends React.Component {
  

  //判断token是否有效

  render() {
    return (
      <Layout className="layout">
        {/* <HeadeNav/> */}
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Button type="primary" onClick={()=>{

            }}>登录</Button>
          </Breadcrumb>
          
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            {/* 路由放在这里 */}
            <p>公司简介</p>
          </div>
        </Content>
        <FooterCommon />
      </Layout>
    )
  }
}


export default App