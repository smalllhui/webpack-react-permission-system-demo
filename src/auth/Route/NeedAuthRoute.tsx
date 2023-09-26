import React, { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAppSelector } from '@/store'

/**
 * @Description:需要权限校验的Route
 */
const NeedAuthRoute: React.FC<PropsWithChildren<any>> = props => {
  const location = useLocation()
  const loginStore = useAppSelector(store => store.loginUser)
  return loginStore.isLogin ? props.children : <Navigate to="/login" state={{ from: location.pathname }} />
}

export default NeedAuthRoute
