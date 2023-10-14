/**
 *tag数据类型
 */
export type TagType = {
  path: string
  name: string
}
/**
 * tag帮助类型
 */
export type ITagHelp = {
  /**
   * tag标签path
   */
  activePath: string
  /**
   * 保存默认展开的菜单key数组
   */
  defaultMenuOpenKeys: string[]
  /**
   * 保存默认选中的菜单key数组
   */
  defaultMenuSelectedKeys: string[]
  /**
   * 面包屑数组
   */
  breadcrumbList: string[]
}
