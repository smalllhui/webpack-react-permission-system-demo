/**
 * 菜单类型枚举
 */
export enum MenuType {
  /**
   * 目录
   */
  directory = 1,
  /**
   * 菜单
   */
  menu = 2,
  /**
   * 按钮
   */
  button = 3,
}
/**
 *系统左侧菜单接口属性
 */
export interface IMenuProps {
  /**
   * 菜单ID
   */
  id: number
  /**
   * 菜单类型：1：目录 2：菜单 3：按钮
   */
  type: MenuType
  /**
   *图标样式
   */
  icon?: string
  /**
   * 菜单标题名称
   */
  menuName: string
  /**
   * 菜单访问路径
   */
  path?: string
  /**
   * 是否需要登录才能访问
   */
  isAuth?: boolean
  /**
   * 菜单组件地址
   */
  componentPath?: string
  /**
   * 权限码
   */
  authCode?: string
  /**
   * 子集菜单
   */
  children?: IMenuProps[]
}
