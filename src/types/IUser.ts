/**
 * 系统用户属性接口
 */
export interface IUser {
  /**
   * 用户头像
   */
  userAvatar: string
  /**
   * 用户名
   */
  userName: string
}

/**
 * 用户登录成功返回的数据接口类型
 */
export interface RUser {
  token: string
  userInfo: IUser
}
