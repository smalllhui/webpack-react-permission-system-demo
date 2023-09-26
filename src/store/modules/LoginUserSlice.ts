import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

import { IMenuProps } from '@/types/MenuRouter'
import { IUser } from '@/types/IUser'
import type { RouteRecordRaw } from '@/router'

export interface IUserState {
  /**
   * 是否登录
   */
  isLogin: boolean
  /**
   * 登录的token
   */
  token: string | undefined
  /**
   * 登录的用户信息
   */
  userInfo: IUser
  /**
   * 登录用户拥有的权限菜单列表
   */
  menus: IMenuProps[]
  /**
   * 菜单展开折叠状态
   */
  collapsed: boolean
  /**
   *  默认展开的菜单key数组
   */
  defaultMenuOpenKeys: string[]
  /**
   * 默认菜单选中的key数组
   */
  defaultMenuSelectedKeys: string[]
  /**
   * 用户权限路由
   */
  routes: RouteRecordRaw[]
  /**
   * 面包屑数组
   */
  breadcrumbList: string[]
}

const initialState: IUserState = {
  isLogin: false,
  token: undefined,
  userInfo: {
    userAvatar: '',
    userName: '',
  },
  collapsed: false,
  defaultMenuOpenKeys: [],
  defaultMenuSelectedKeys: [],
  breadcrumbList: [],
  menus: [],
  routes: [],
}

/**
 * 创建一个登录用户的slice
 */
const LoginUserSlice = createSlice({
  name: 'login-user-slice',
  initialState,
  reducers: {
    /**
     * 保存用户信息
     */
    saveUserInfo: (
      state: Draft<IUserState>,
      action: PayloadAction<{
        userInfo: IUser
        token: string
      }>,
    ) => {
      state.isLogin = true
      state.userInfo = action.payload.userInfo
      state.token = action.payload.token
    },

    /**
     * 保存用户权限菜单列表
     */
    saveUserMenus: (
      state: Draft<IUserState>,
      action: PayloadAction<{
        menus: IMenuProps[]
      }>,
    ) => {
      state.menus = action.payload.menus
    },
    /**
     * 切换菜单展开收缩状态
     * @param state
     */
    toggleCollapsed: (state: Draft<IUserState>) => {
      state.collapsed = !state.collapsed
    },

    /**
     * 保存默认展开的菜单key数组
     * @param state
     */
    saveDefaultOpenMenuKeys: (state: Draft<IUserState>, action: PayloadAction<{ defaultMenuOpenKeys: string[] }>) => {
      state.defaultMenuOpenKeys = action.payload.defaultMenuOpenKeys
    },
    /**
     * 保存默认选中的菜单key数组
     * @param state
     */
    saveDefaultMenuSelectedKey: (
      state: Draft<IUserState>,
      action: PayloadAction<{ defaultMenuSelectedKeys: string[] }>,
    ) => {
      state.defaultMenuSelectedKeys = action.payload.defaultMenuSelectedKeys
    },
    /**
     * 保存用户路由列表
     */
    saveUserRoutes: (
      state: Draft<IUserState>,
      action: PayloadAction<{
        routes: RouteRecordRaw[]
      }>,
    ) => {
      state.routes = action.payload.routes
    },

    /**
     * 用户退出登录
     */
    userLogout: (state: Draft<IUserState>) => {
      Object.assign(state, initialState)
    },
    /**
     * 保存面包屑路由路径
     * @param state
     */
    saveBreadcrumbList: (state: Draft<IUserState>, action: PayloadAction<{ breadcrumbList: string[] }>) => {
      state.breadcrumbList = action.payload.breadcrumbList
    },
  },
})

// 导出方法
export const {
  userLogout,
  saveUserInfo,
  saveUserMenus,
  saveUserRoutes,
  toggleCollapsed,
  saveDefaultOpenMenuKeys,
  saveDefaultMenuSelectedKey,
  saveBreadcrumbList,
} = LoginUserSlice.actions

// 默认导出
export default LoginUserSlice.reducer
