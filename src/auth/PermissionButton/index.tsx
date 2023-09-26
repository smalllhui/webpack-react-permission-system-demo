import React, { PropsWithChildren, useEffect, useState } from 'react'
import { matchRoutes } from 'react-router-dom'
import { useAppSelector } from '@/store'

interface IProps {
  /**
   * 权限码
   */
  authCode: string
  /**
   * 无权限是否禁用按钮(true:禁用按钮，false:不渲染按钮)
   */
  isDisable?: boolean
}
/**
 * 权限按钮组件
 * @description:判断用户是否有操作按钮的权限  没有权限 是否禁用按钮(isDisable)：true禁用按钮 false不渲染按钮
 */
const PermissionButton: React.FC<PropsWithChildren<IProps>> = props => {
  const loginUserStore = useAppSelector(store => store.loginUser)
  const [isPermission, setIsPermission] = useState<boolean>(false)
  // 匹配当前层级路由树 第一个元素为根路由 最后一个元素为当前路由
  const matches = matchRoutes(loginUserStore.routes, window.location)
  useEffect(() => {
    if (matches && matches.length > 0) {
      const currentRoute = matches[matches.length - 1].route
      if (currentRoute.meta && currentRoute.meta.authList) {
        for (let i = 0; i < currentRoute.meta.authList.length; i++) {
          if (currentRoute.meta.authList[i].includes(props.authCode)) {
            setIsPermission(true)
            break
          }
        }
      }
    }
  }, [])
  // 判断用户是否有操作按钮的权限  没有权限 是否禁用按钮(isDisable)：true禁用按钮 false隐藏按钮
  return (
    <>
      {isPermission
        ? props.children
        : props.isDisable
        ? // 将 props.isDisable传递给props.children
          React.Children.map(props.children, (child: any) => React.cloneElement(child, { disabled: props.isDisable }))
        : null}
    </>
  )
}

export default PermissionButton
