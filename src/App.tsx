import React, { useState, useEffect } from 'react'
import type { ThemeConfig } from 'antd'
import { ConfigProvider } from 'antd'
import { routers } from '@/router'
import { useAppSelector } from '@/store'

import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'

import ErrorBoundary from '@/components/ErrorBoundary'
import RenderRoute from '@/auth/Route/RenderRoute'

dayjs.locale('zh-cn')

// 主题色配置
const config: ThemeConfig = {
  token: {
    // colorPrimary: "#00b96b",
  },
}

const App: React.FC = () => {
  const loginUserStore = useAppSelector(store => store.loginUser)
  const [routerList, setRouterList] = useState(routers)
  useEffect(() => {
    setRouterList(preRoutes => {
      preRoutes[0].children = loginUserStore.routes
      return [...preRoutes]
    })
  }, [loginUserStore.routes])
  return (
    <ConfigProvider theme={config} locale={zhCN}>
      <ErrorBoundary>
        <RenderRoute routes={routerList} />
      </ErrorBoundary>
    </ConfigProvider>
  )
}

export default App
