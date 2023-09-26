import React from 'react'
import { Link } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { Menu, Layout } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'

// 自定义类型
import { IMenuProps } from '@/types/MenuRouter'

// 自定义组件
import IconFont from '@/components/IconFont'
import SysLogo from '@/components/Logo'

const { Sider } = Layout

interface IProps {
  /**
   * 收缩状态
   */
  collapsed: boolean
  /**
   * 系统名称
   */
  systemName: string
  /**
   * 系统logo
   */
  logoImgSrc: string
  /**
   * 导航菜单
   */
  menuList: IMenuProps[]
  /**
   * 默认展开的菜单数组
   */
  defaultOpenKeys: string[]
  /**
   *  默认选中的菜单数组
   */
  defaultSelectedKeys: string[]
  /**
   * 菜单点击事件
   * @param keyPath 当前展开的路径
   * @param selectedKey 当前点中的可以
   */
  onMenuClick: (keyPath: string[], selectedKey: string) => void
}

const LOGO_HEIGHT = 64

/**
 * 加工生成菜单格式数据
 * @param menus 菜单数组
 * @returns {menuList} 加工后的菜单数组
 */
const getMenuList = (menus: IMenuProps[]): MenuProps['items'] => {
  const menuList: MenuProps['items'] = []
  menus.forEach(menu => {
    if (menu.type === 1) {
      menuList.push({
        key: String(menu.id),
        label: menu.menuName,
        icon: menu.icon ? <IconFont type={menu.icon} /> : undefined,
        children: menu.children && menu.children.length > 0 ? getMenuList(menu.children) : undefined,
      })
    } else if (menu.type === 2) {
      menuList.push({
        key: String(menu.id),
        icon: menu.icon ? <IconFont type={menu.icon} /> : undefined,
        label: <Link to={menu.path as string}>{menu.menuName}</Link>,
      })
    }
  })
  return menuList
}

/**
 * description:左侧菜单组件
 */
const SiderMenu: React.FC<IProps> = props => {
  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
      <SysLogo
        logoImgSrc={props.logoImgSrc}
        systemName={props.systemName}
        height={LOGO_HEIGHT}
        collapsed={props.collapsed}
      />
      <Scrollbars style={{ height: `calc(100vh - ${LOGO_HEIGHT}px)` }}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={props.defaultSelectedKeys}
          defaultOpenKeys={props.collapsed ? [] : props.defaultOpenKeys}
          items={getMenuList(props.menuList)}
          onClick={e => props.onMenuClick(e.keyPath, e.key)}
        />
      </Scrollbars>
    </Sider>
  )
}

export default SiderMenu
