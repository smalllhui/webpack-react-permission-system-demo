import React, { Fragment, useEffect, useMemo } from 'react'
import { Outlet, Route, Routes, matchRoutes, useLocation } from 'react-router-dom'
import type { RouteRecordRaw } from '@/router'
import { lazyLoad } from '@/router'

import NeedAuthRoute from './NeedAuthRoute'

/**
 * 递归生成权限路由
 * @param routerList
 */
const generateAuthRoute = (routerList: RouteRecordRaw[]) => {
  return routerList.map(item => {
    // 动态加载路由
    const routeComp = item.element ? item.element : lazyLoad(item.componentPath)
    // 权限校验
    const element = item.requireAuth ? <NeedAuthRoute>{routeComp}</NeedAuthRoute> : routeComp

    return (
      <Route key={item.path} path={item.path} element={element}>
        {item.children ? generateAuthRoute(item.children) : null}
      </Route>
    )
  })
}

/**
 * @Description: 渲染路由页面组件
 */
const RenderRouter: React.FC<{ routes: RouteRecordRaw[] }> = ({ routes }) => {
  const location = useLocation()
  // 权限路由
  const authRoutes = useMemo(() => {
    return generateAuthRoute(routes)
  }, [routes])

  // 动态设置页面标题 【bug 刷新会匹配404标题】
  useEffect(() => {
    // 匹配当前层级路由树 第一个元素为根路由 最后一个元素为当前路由
    const matches = matchRoutes(routes, location.pathname)
    if (matches && matches.length > 0) {
      const currentRoute = matches[matches.length - 1].route
      if (currentRoute.meta && currentRoute.meta.title) {
        // 设置页面标题
        document.title = currentRoute.meta.title
      }
    }
  }, [location.pathname])

  return (
    <Fragment>
      <Routes>{authRoutes}</Routes> <Outlet />
    </Fragment>
  )
}

export default RenderRouter
