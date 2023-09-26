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
}

// 初始化数据
const initialState: ISystemState = {
  systemLogo: logo,
  systemName: 'React+Ts+Hook',
  loginPageTitle: 'React权限系统',
  loginPageDesc: 'Vite+React+TypeScript+Eslint+Prettier+lint-staged+husky+commitlint',
}

// 创建一个系统的Slice 用于配置系统设置
export const SystemSlice = createSlice({
  name: 'SystemSlice',
  initialState,
  reducers: {},
})

// 默认导出
export default SystemSlice.reducer
