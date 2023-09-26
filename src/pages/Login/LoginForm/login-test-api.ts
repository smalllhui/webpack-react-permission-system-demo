/**
 * 模拟Api
 */

import { RUser } from '@/types/IUser'
import { IMenuProps, MenuType } from '@/types/MenuRouter'
import logoImg from '@/assets/images/logo.svg'

interface IResult<T> {
  code: number
  data: T
  message?: string
}

/**
 * @description: 用户账号密码登录
 * @param {string} userAccount 用户账号
 * @param {string} password 密码
 * @return {Promise<RUser>}
 */
export const userLoginByAccount = (userAccount: string, password: string): Promise<IResult<RUser>> => {
  console.log(`用户账号密码登录:userAccount:${userAccount}--password:${password}`)
  return new Promise<IResult<RUser>>(resolve => {
    const loginUser = {
      token: 'token_xxxxxx',
      userInfo: {
        userAvatar: logoImg,
        userName: 'PanZonghui',
      },
    }
    setTimeout(() => {
      resolve({
        code: 200,
        data: loginUser,
      })
    }, 200)
  })
}

/**
 * @description:用户手机号验证码登录
 * @param {string} phoneNumber 手机号
 * @param {string} captcha 验证码
 * @return {Promise<RUser>}
 */
export const userLoginByPhone = (phoneNumber: string, captcha: string): Promise<IResult<RUser>> => {
  console.log(`用户手机号验证码登录:phoneNumber:${phoneNumber}--captcha:${captcha}`)
  return new Promise<IResult<RUser>>(resolve => {
    const loginUser = {
      token: 'token_yyyy',
      userInfo: {
        userAvatar: logoImg,
        userName: 'PanZonghui',
      },
    }
    setTimeout(() => {
      resolve({
        code: 200,
        data: loginUser,
      })
    }, 2000)
  })
}

/**
 * @description: 根据token查询权限菜单列表
 * @return {*}
 */
export const queryUserMenuListByToken = (): Promise<IResult<IMenuProps[]>> => {
  console.log('根据token查询权限菜单列表')
  return new Promise<IResult<IMenuProps[]>>(resolve => {
    const menuList: IMenuProps[] = [
      {
        id: 1,
        menuName: '按钮权限',
        icon: 'icon-shouye',
        path: '/home',
        type: MenuType.menu,
        componentPath: 'pages/Home',
        children: [
          {
            id: 4,
            type: MenuType.button,
            menuName: '添加按钮',
            authCode: 'add',
          },
          {
            id: 5,
            type: MenuType.button,
            menuName: '编辑按钮',
            authCode: 'edit',
          },
        ],
      },
      {
        id: 2,
        menuName: '个人页',
        icon: 'icon-gerenxinxi',
        type: MenuType.directory,
        children: [
          {
            id: 3,
            menuName: '个人中心',
            icon: 'icon-gerenzhongxin',
            path: '/person/center',
            type: MenuType.menu,
            componentPath: 'pages/Person/Center',
          },
          {
            id: 4,
            menuName: '个人设置',
            icon: 'icon-gerenshezhi',
            path: '/person/setting',
            type: MenuType.menu,
            componentPath: 'pages/Person/Setting',
          },
        ],
      },
      {
        id: 5,
        menuName: '异常页',
        icon: 'icon-yichangguanli',
        type: MenuType.directory,
        children: [
          {
            id: 6,
            menuName: '403',
            icon: 'icon-a-403',
            path: '/exception/403',
            type: MenuType.menu,
            componentPath: 'pages/Exception/NoPermission',
          },
          {
            id: 7,
            menuName: '404',
            icon: 'icon-icon-test1',
            path: '/exception/404',
            type: MenuType.menu,
            componentPath: 'pages/Exception/NotFound',
          },
          {
            id: 8,
            menuName: '500',
            icon: 'icon-icon-test2',
            path: '/exception/500',
            type: MenuType.menu,
            componentPath: 'pages/Exception/ServerError',
          },
        ],
      },
      {
        id: 9,
        menuName: 'ChatGPT',
        icon: 'icon-shouye',
        type: MenuType.directory,
        children: [
          {
            id: 10,
            menuName: '简单版GPT',
            icon: 'icon-shouye',
            path: '/chatgpt/simple',
            type: MenuType.menu,
            componentPath: 'pages/ChatGPT/SimpleVersion',
          },
          {
            id: 11,
            menuName: '升级版GPT',
            icon: 'icon-shouye',
            path: '/chatgpt/plus',
            type: MenuType.menu,
            componentPath: 'pages/ChatGPT/PlusVersion',
          },
        ],
      },
    ]
    setTimeout(() => {
      resolve({
        code: 200,
        data: menuList,
      })
    }, 200)
  })
}
