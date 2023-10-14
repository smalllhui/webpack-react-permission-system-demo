import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

import type { TagType, ITagHelp } from '@/types/ITag'

export interface ITagState {
  /**
   * 高亮的tag标签path
   */
  activePath: string
  /**
   * tag标签列表
   */
  tagList: Array<TagType>
  /**
   * tag帮助列表
   */
  tagHelpList: Array<ITagHelp>
  /**
   * 保存默认展开的菜单key数组
   */
  defaultMenuOpenKeys: string[]
  /**
   * 保存默认选中的菜单key数组
   */
  defaultMenuSelectedKeys: string[]
  /**
   * 保存面包屑路由路径
   */
  breadcrumbList: string[]
}

const initialState: ITagState = {
  tagList: [],
  tagHelpList: [],
  activePath: '',
  defaultMenuOpenKeys: [],
  defaultMenuSelectedKeys: [],
  breadcrumbList: [],
}

/**
 * 创建一个tag标签的slice
 */
const TagSlice = createSlice({
  name: 'tag-slice',
  initialState,
  reducers: {
    /**
     * 切换路由
     */
    switchRoutePath: (state: Draft<ITagState>, action: PayloadAction<{ activePath: string }>) => {
      state.activePath = action.payload.activePath
      const helpTagItem = state.tagHelpList.find(item => item.activePath === action.payload.activePath)
      if (helpTagItem) {
        // 设置当前展开的menu
        state.defaultMenuOpenKeys = helpTagItem.defaultMenuOpenKeys
        state.defaultMenuSelectedKeys = helpTagItem.defaultMenuSelectedKeys
        state.breadcrumbList = helpTagItem.breadcrumbList
      }
    },
    /**
     * 添加tag
     */
    addTag: (state: Draft<ITagState>, action: PayloadAction<{ tagObj: TagType; tagHelpObj: ITagHelp }>) => {
      const findItem = state.tagList.find(item => item.path === action.payload.tagObj.path)
      const helpTagItem = state.tagHelpList.find(item => item.activePath === action.payload.tagObj.path)
      if (findItem) {
        state.activePath = findItem.path
        if (helpTagItem) {
          // 设置当前展开的menu
          state.defaultMenuOpenKeys = helpTagItem.defaultMenuOpenKeys
          state.defaultMenuSelectedKeys = helpTagItem.defaultMenuSelectedKeys
          state.breadcrumbList = helpTagItem.breadcrumbList
        }
      } else {
        state.activePath = action.payload.tagObj.path
        state.tagList = state.tagList.concat(action.payload.tagObj)
        state.tagHelpList = state.tagHelpList.concat(action.payload.tagHelpObj)
        // 设置当前展开的menu
        state.defaultMenuOpenKeys = action.payload.tagHelpObj.defaultMenuOpenKeys
        state.defaultMenuSelectedKeys = action.payload.tagHelpObj.defaultMenuSelectedKeys
        state.breadcrumbList = action.payload.tagHelpObj.breadcrumbList
      }
    },
    /**
     * 删除tag
     */
    delTag: (state: Draft<ITagState>, action: PayloadAction<{ activePath: string }>) => {
      state.tagList = state.tagList.filter(item => item.path !== action.payload.activePath)
      if (state.tagList.length > 0) {
        state.activePath = state.tagList[state.tagList.length - 1].path
      }
      state.tagHelpList = state.tagHelpList.filter(item => item.activePath !== action.payload.activePath)
      if (state.tagHelpList.length > 0) {
        const helpTagItem = state.tagHelpList[state.tagHelpList.length - 1]
        // 设置当前展开的menu
        state.defaultMenuOpenKeys = helpTagItem.defaultMenuOpenKeys
        state.defaultMenuSelectedKeys = helpTagItem.defaultMenuSelectedKeys
        state.breadcrumbList = helpTagItem.breadcrumbList
      }
    },
    /**
     * 删除其它tag
     */
    delOtherTag: (state: Draft<ITagState>, action: PayloadAction<{ activePath: string }>) => {
      state.tagList = state.tagList.filter(item => item.path === action.payload.activePath)
      if (state.tagList.length > 0) {
        state.activePath = state.tagList[state.tagList.length - 1].path
      }
      state.tagHelpList = state.tagHelpList.filter(item => item.activePath === action.payload.activePath)
      if (state.tagHelpList.length > 0) {
        const helpTagItem = state.tagHelpList[state.tagHelpList.length - 1]
        // 设置当前展开的menu
        state.defaultMenuOpenKeys = helpTagItem.defaultMenuOpenKeys
        state.defaultMenuSelectedKeys = helpTagItem.defaultMenuSelectedKeys
        state.breadcrumbList = helpTagItem.breadcrumbList
      }
    },
  },
})

// 导出方法
export const { switchRoutePath, addTag, delTag, delOtherTag } = TagSlice.actions

// 默认导出
export default TagSlice.reducer
