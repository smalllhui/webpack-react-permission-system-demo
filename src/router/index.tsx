import React, { Suspense } from 'react'
import loadable from '@loadable/component'

/**
 * 自定义Route接口属性
 */
export interface RouteRecordRaw {
  /**
   * 路由访问路径
   */
  path: string
  /**
   * 组件路径
   */
  componentPath: string
  /**
   * 是否需要登录才能访问
   */
  requireAuth?: boolean
  /**
   * 组件
   */
  element?: React.ReactNode | null
  /**
   * 是否有子路由
   */
  children?: RouteRecordRaw[]
  /**
   * 扩展信息
   */
  meta: {
    paths?: string[]
    authList?: string[]
    title: string
  }
}

/**
 * 动态懒加载路由
 * @param path 路由路径
 * @returns
 */
export const lazyLoad = (path: string) => {
  // 动态懒加载
  // const Module = loadable(() => import(`@/${path}`))
  const Module = loadable(() => import(`@/${path}`), {
    fallback: <Suspense></Suspense>,
  })

  return <Module />
}

/**
 * 配置公共的路由
 */
export const routers: RouteRecordRaw[] = [
  {
    path: '/',
    requireAuth: true, // 需要登录才能访问
    componentPath: 'layout',
    meta: {
      title: '',
    },
    children: [], // 子路由列表
  },
  {
    path: '/login',
    componentPath: 'pages/Login',
    meta: {
      title: '用户登录',
    },
  },
  {
    path: '/exception/403',
    componentPath: 'pages/Exception/NoPermission',
    meta: {
      title: '403',
    },
  },
  {
    path: '/exception/404',
    componentPath: 'pages/Exception/NotFound',
    meta: {
      title: '404',
    },
  },
  {
    path: '/exception/500',
    componentPath: 'pages/Exception/ServerError',
    meta: {
      title: '500',
    },
  },

  // 配置404，需要放在最后
  {
    path: '/*',
    componentPath: 'pages/Exception/NotFound',
    meta: {
      title: '404',
    },
  },
]
