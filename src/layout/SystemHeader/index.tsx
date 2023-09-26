import React from 'react'
import { Layout, Row, Col } from 'antd'
import type { FullScreenHandle } from 'react-full-screen'

import { Collapse, Reload, MyBreadcrumb, FullScreen, NavInfo, Language, User } from '@/components/Header'

import './index.less'

interface IProps {
  collapsed: boolean // 菜单展开/收缩状态
  userAvatar: string // 登录成功用户头像
  userName: string // 登录成功用户名称
  breadcrumbList: string[] // 面包屑路由路径
  changeCollapsed: () => void // 改变(菜单展开/收缩状态)事件
  handleRefresh: () => void // 刷新事件
  clickUserLogout: () => void // 用户点击退出登录事件
  screenHandle: FullScreenHandle // 全屏事件对象
}

/**
 * Description:系统头部组件
 */
const SystemHeader: React.FC<IProps> = props => {
  return (
    <Layout.Header className="headerContainer">
      <Row wrap={false} style={{ height: '100%' }}>
        <Col flex="none">
          <Row wrap={false} style={{ height: '100%' }}>
            <Col>
              <Collapse collapsed={props.collapsed} changeCollapsed={props.changeCollapsed} />
            </Col>
            <Col>
              <Reload handleRefresh={props.handleRefresh} />
            </Col>
          </Row>
        </Col>
        <Col flex="auto">
          <Row wrap={false} justify="space-between" style={{ height: '100%' }}>
            <Col flex="none">
              <MyBreadcrumb breadcrumbList={props.breadcrumbList} />
            </Col>
            <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Row wrap={false} style={{ height: '100%' }}>
                <Col>
                  <FullScreen screenHandle={props.screenHandle} />
                </Col>
                <Col>
                  <NavInfo infoTotal={3} />
                </Col>
                <Col>
                  <User
                    userAvatar={props.userAvatar}
                    userName={props.userName}
                    clickUserLogout={props.clickUserLogout}
                  />
                </Col>
                <Col>
                  <Language />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default SystemHeader
