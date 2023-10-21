import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Layout } from 'antd'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { Scrollbars } from 'react-custom-scrollbars'

// 自定义类型
import { IMenuProps } from '@/types/MenuRouter'
import type { TagType, ITagHelp } from '@/types/ITag'

// store
import { useAppSelector, useAppDispatch } from '@/store'
import { userLogout, toggleCollapsed } from '@/store/modules/LoginUserSlice'
import { addTag, delTag, delOtherTag, switchRoutePath } from '@/store/modules/TagSlice'

// 自定义组件
import SiderMenu from './SiderMenu'
import SystemHeader from './SystemHeader'
import TagsView from './TagsView'

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
 *
 * 获取当前激活的路由路径
 * @param mens 菜单列表
 * @param menuKeys 点击菜单的路径
 */
const getActivePath = (mens: IMenuProps[], menuKeys: string[]) => {
  /**
   * 生成面包屑路径
   * @param menuList 菜单列表
   * @param currentMenuKeys 点击菜单的路径
   * @param activePathList 激活的路径数组
   */
  const generateBreadcrumbList = (menuList: IMenuProps[], currentMenuKeys: string[], activePathList: string[]) => {
    menuList.forEach(menu => {
      if (currentMenuKeys.includes(String(menu.id))) {
        if (menu.path) activePathList.push(menu.path)
        if (menu.children && menu.children.length > 0) {
          generateBreadcrumbList(menu.children, currentMenuKeys, activePathList)
        }
      }
    })
  }

  const activePathList: string[] = []
  generateBreadcrumbList(mens, menuKeys, activePathList)
  return activePathList[0]
}
/**
 * @Description:系统后台布局页面
 */
const SysLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const handle = useFullScreenHandle() // 创建一个fullScreen的handle
  const systemStore = useAppSelector(store => store.system)
  const loginUserStore = useAppSelector(store => store.loginUser)
  const tagStore = useAppSelector(store => store.tag)
  const dispatch = useAppDispatch()
  const userInfo = loginUserStore.userInfo

  useEffect(() => {
    const path = tagStore.activePath
    if (location.pathname !== path) {
      navigate(path) //路由跳转
    }
  }, [tagStore.activePath])

  // todo 切换菜单展开收缩状态事件
  const onToggleCollapsed = () => {
    dispatch(toggleCollapsed())
  }

  // todo 用户退出登录事件
  const handleUserLogout = () => {
    dispatch(userLogout())
  }

  /**
   *  todo 左侧菜单点击事件
   * @param keyPath 当前展开的路径
   * @param selectedKey 当前点中的可以
   */
  const onMenuClick = (keyPath: string[], selectedKey: string) => {
    // 设置面包屑路径
    const breadcrumbList = getBreadcrumbList(loginUserStore.menus, keyPath)
    // 设置展开目录
    const defaultMenuOpenKeys = keyPath
    // 设置该菜单高亮
    const defaultMenuSelectedKeys = [selectedKey]

    // 添加到tag Store
    const activePath = getActivePath(loginUserStore.menus, keyPath)
    const tagObj: TagType = {
      path: activePath,
      name: breadcrumbList[breadcrumbList.length - 1],
    }
    const tagHelpObj: ITagHelp = {
      activePath,
      defaultMenuOpenKeys,
      defaultMenuSelectedKeys,
      breadcrumbList,
    }
    dispatch(addTag({ tagObj, tagHelpObj }))
  }

  // todo 点击刷新事件
  const onRefresh = () => {
    window.location.reload()
  }

  // 关闭当前tag
  const onCloseCurrentTag = () => {
    if (tagStore.tagList.length > 1) dispatch(delTag({ activePath: tagStore.activePath }))
  }
  // 关闭其它tag
  const onCloseOtherTag = () => {
    dispatch(delOtherTag({ activePath: tagStore.activePath }))
  }
  // 根据path关闭tag
  const onCloseTagByPath = (path: string) => {
    dispatch(delTag({ activePath: path }))
  }
  // 激活tag标签path
  const onSwitchRoutePath = (path: string) => {
    // 设置当前path的tag标签高亮
    dispatch(switchRoutePath({ activePath: path }))
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
          defaultOpenKeys={tagStore.defaultMenuOpenKeys}
          defaultSelectedKeys={tagStore.defaultMenuSelectedKeys}
          onMenuClick={onMenuClick}
          darkItemBg={systemStore.darkItemBg}
          darkSubMenuItemBg={systemStore.darkSubMenuItemBg}
          darkItemColor={systemStore.darkItemColor}
          darkItemHoverBg={systemStore.darkItemHoverBg}
          darkItemSelectedBg={systemStore.darkItemSelectedBg}
          darkItemHoverColor={systemStore.darkItemHoverColor}
          darkItemSelectedColor={systemStore.darkItemSelectedColor}
        />
        <Layout>
          <SystemHeader
            collapsed={loginUserStore.collapsed}
            screenHandle={handle}
            breadcrumbList={tagStore.breadcrumbList}
            userAvatar={userInfo.userAvatar}
            userName={userInfo.userName}
            changeCollapsed={onToggleCollapsed}
            handleRefresh={onRefresh}
            clickUserLogout={handleUserLogout}
          />
          <TagsView
            tagList={tagStore.tagList}
            activePath={tagStore.activePath}
            onCloseTagByPath={onCloseTagByPath}
            onSwitchRoutePath={onSwitchRoutePath}
            onRefresh={onRefresh}
            onCloseCurrent={onCloseCurrentTag}
            onCloseOther={onCloseOtherTag}
          />
          <Content style={{ height: '100%', width: '100%', background: '#fff' }}>
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
