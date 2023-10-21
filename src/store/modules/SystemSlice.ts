import { createSlice } from '@reduxjs/toolkit'

import logo from '@/assets/images/logo.svg'

export interface ISystemState {
  /**
   * 系统Logo
   */
  systemLogo: string
  /**
   * 系统名称
   */
  systemName: string
  /**
   * 登录页面的标题
   */
  loginPageTitle: string
  /**
   * 登录页面的描述
   */
  loginPageDesc: string
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
}

// 初始化数据
const initialState: ISystemState = {
  systemLogo: logo,
  systemName: 'React+Ts+Hook',
  loginPageTitle: 'React权限系统',
  loginPageDesc: 'Vite+React+TypeScript+Eslint+Prettier+lint-staged+husky+commitlint',
  darkItemBg: 'rgb(48, 65, 86)',
  darkItemColor: '#fff',
  darkSubMenuItemBg: 'rgb(48, 65, 86)',
  darkItemHoverBg: '#263445',
  darkItemSelectedBg: '#263445',
  darkItemHoverColor: '#409EFF',
  darkItemSelectedColor: '#409EFF',
}

// 创建一个系统的Slice 用于配置系统设置
export const SystemSlice = createSlice({
  name: 'SystemSlice',
  initialState,
  reducers: {},
})

// 默认导出
export default SystemSlice.reducer
