import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { Menu, Layout, ConfigProvider } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'

// 自定义类型
import { IMenuProps } from '@/types/MenuRouter'

// 自定义组件
import IconFont from '@/components/IconFont'
import SysLogo from '@/components/Logo'

const { Sider } = Layout

/**
 * 接收属性
 */
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
   * 暗色模式下的菜单项背景
   */
  darkItemBg: string
  /**
   * 暗色模式下的子菜单项背景
   */
  darkSubMenuItemBg: string
  /**
   * 暗色模式下的菜单项文字颜色
   */
  darkItemColor: string
  /**
   * 暗色模式下的菜单项悬浮背景
   */
  darkItemHoverBg: string //
  /**
   * 暗色模式下的菜单项选中背景
   */
  darkItemSelectedBg: string
  /**
   * 暗色模式下的菜单项悬浮字体颜色
   */
  darkItemHoverColor: string
  /**
   * 暗色模式下的菜单项选中颜色
   */
  darkItemSelectedColor: string
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

const LOGO_HEIGHT = 64 // logo的高度

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
  const [openKeys, setOpenKeys] = useState<string[] | undefined>([]) // 展开的key数组
  useEffect(() => {
    if (props.collapsed) {
      setOpenKeys(undefined) // 左侧菜单折起
    } else {
      setOpenKeys(props.defaultOpenKeys)
    }
  }, [props.defaultOpenKeys, props.collapsed])

  // SubMenu 展开/关闭的回调
  const handleOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys)
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            darkItemBg: props.darkItemBg, // 暗色模式下的菜单项背景
            darkSubMenuItemBg: props.darkSubMenuItemBg, // 	暗色模式下的子菜单项背景
            darkItemColor: props.darkItemColor, // 暗色模式下的菜单项文字颜色
            darkItemHoverBg: props.darkItemHoverBg, // 暗色模式下的菜单项悬浮背景
            darkItemSelectedBg: props.darkItemSelectedBg, // 暗色模式下的菜单项选中背景
            darkItemHoverColor: props.darkItemHoverColor, // 暗色模式下的菜单项悬浮字体颜色
            darkItemSelectedColor: props.darkItemSelectedColor, // 暗色模式下的菜单项选中颜色
            itemBorderRadius: 0, // 菜单项的圆角
            itemMarginInline: 0, //菜单项横向外间距
          },
        },
      }}
    >
      <Sider trigger={null} collapsible collapsed={props.collapsed} style={{ backgroundColor: props.darkItemBg }}>
        <SysLogo
          logoImgSrc={props.logoImgSrc}
          systemName={props.systemName}
          height={LOGO_HEIGHT}
          collapsed={props.collapsed}
          textColor={props.darkItemColor} // 文字颜色
        />
        <Scrollbars style={{ height: `calc(100vh - ${LOGO_HEIGHT}px)` }}>
          <Menu
            theme="dark"
            mode="inline"
            openKeys={openKeys}
            selectedKeys={props.defaultSelectedKeys}
            items={getMenuList(props.menuList)}
            onClick={e => props.onMenuClick(e.keyPath, e.key)}
            onOpenChange={handleOpenChange}
          />
        </Scrollbars>
      </Sider>
    </ConfigProvider>
  )
}

export default SiderMenu
