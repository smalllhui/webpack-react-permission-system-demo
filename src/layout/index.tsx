import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { Scrollbars } from 'react-custom-scrollbars'

// 自定义类型
import { IMenuProps } from '@/types/MenuRouter'

// store
import { useAppSelector, useAppDispatch } from '@/store'
import {
  userLogout,
  toggleCollapsed,
  saveDefaultOpenMenuKeys,
  saveDefaultMenuSelectedKey,
  saveBreadcrumbList,
} from '@/store/modules/LoginUserSlice'

// 自定义组件
import SiderMenu from './SiderMenu'
import SystemHeader from './SystemHeader'

const { Content } = Layout

/**
 * 生成面包屑路径
 * @param mens 菜单列表
 * @param menuKeys 点击菜单的路径
 */
const getBreadcrumbList = (mens: IMenuProps[], menuKeys: string[]) => {
  /**
   * 生成面包屑路径
   * @param menuList 菜单列表
   * @param currentMenuKeys 点击菜单的路径
   * @param breadcrumbList 面包屑数组
   */
  const generateBreadcrumbList = (menuList: IMenuProps[], currentMenuKeys: string[], breadcrumbList: string[]) => {
    menuList.forEach(menu => {
      if (currentMenuKeys.includes(String(menu.id))) {
        breadcrumbList.push(menu.menuName)
        if (menu.children && menu.children.length > 0) {
          generateBreadcrumbList(menu.children, currentMenuKeys, breadcrumbList)
        }
      }
    })
  }

  const breadcrumbList: string[] = []
  generateBreadcrumbList(mens, menuKeys, breadcrumbList)
  return breadcrumbList
}

/**
 * @Description:系统后台布局页面
 */
const SysLayout: React.FC = () => {
  const handle = useFullScreenHandle() // 创建一个fullScreen的handle
  const systemStore = useAppSelector(store => store.system)
  const loginUserStore = useAppSelector(store => store.loginUser)
  const dispatch = useAppDispatch()
  const userInfo = loginUserStore.userInfo

  // todo 切换菜单展开收缩状态事件
  const onToggleCollapsed = () => {
    dispatch(toggleCollapsed())
  }

  // todo 用户退出登录事件
  const handleUserLogout = () => {
    console.log('用户退出登录事件')
    dispatch(userLogout())
  }

  /**
   *  todo 左侧菜单点击事件
   * @param keyPath 当前展开的路径
   * @param selectedKey 当前点中的可以
   */
  const onMenuClick = (keyPath: string[], selectedKey: string) => {
    const breadcrumbList = getBreadcrumbList(loginUserStore.menus, keyPath)
    dispatch(saveDefaultOpenMenuKeys({ defaultMenuOpenKeys: keyPath }))
    dispatch(saveDefaultMenuSelectedKey({ defaultMenuSelectedKeys: [selectedKey] }))
    dispatch(saveBreadcrumbList({ breadcrumbList }))
  }

  // todo 点击刷新事件
  const onRefresh = () => {
    window.location.reload()
  }

  return (
    <FullScreen handle={handle}>
      <Layout style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
        {/* 左侧菜单 */}
        <SiderMenu
          systemName={systemStore.systemName}
          logoImgSrc={systemStore.systemLogo}
          collapsed={loginUserStore.collapsed}
          menuList={loginUserStore.menus}
          defaultOpenKeys={loginUserStore.defaultMenuOpenKeys}
          defaultSelectedKeys={loginUserStore.defaultMenuSelectedKeys}
          onMenuClick={onMenuClick}
        />
        <Layout>
          <SystemHeader
            collapsed={loginUserStore.collapsed}
            screenHandle={handle}
            breadcrumbList={loginUserStore.breadcrumbList}
            userAvatar={userInfo.userAvatar}
            userName={userInfo.userName}
            changeCollapsed={onToggleCollapsed}
            handleRefresh={onRefresh}
            clickUserLogout={handleUserLogout}
          />
          <Content style={{ height: '100%', width: '100%' }}>
            <Scrollbars>
              <Outlet />
            </Scrollbars>
          </Content>
        </Layout>
      </Layout>
    </FullScreen>
  )
}

export default SysLayout
