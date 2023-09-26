import React from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

interface IProps {
  collapsed: boolean // 菜单展开/收缩状态
  changeCollapsed: (collapsed: boolean) => void // 改变(菜单展开/收缩状态)事件
}

/**
 *收缩菜单组件
 */
const Collapsed: React.FC<IProps> = props => {
  return (
    <div className="icon" onClick={() => props.changeCollapsed(!props.collapsed)}>
      {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
  )
}

export default Collapsed
