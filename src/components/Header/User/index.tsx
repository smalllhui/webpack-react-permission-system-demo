import React from 'react'
import { Image, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { SettingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'

import { useTranslation } from 'react-i18next'

interface childProp {
  userAvatar: string // 登录成功用户头像
  userName: string // 登录成功用户名称
  clickUserLogout: () => void // 用户点击退出登录事件
}

/**
 * 系统头部用户组件
 */
const User: React.FC<childProp> = props => {
  const { t } = useTranslation() // 根据当前语言环境获取i18n读取数据

  const operationList: MenuProps['items'] = [
    {
      label: t('用户操作.个人中心'),
      key: '/user/info',
      icon: <UserOutlined />,
    },
    {
      label: t('用户操作.个人设置'),
      key: '/user/setting',
      icon: <SettingOutlined />,
    },
    {
      type: 'divider',
    },
    {
      label: t('用户操作.退出登录'),
      icon: <LogoutOutlined />,
      key: '/user/logout',
    },
  ]

  // 用户操作事件
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    console.log(`用户操作事件---点击了${key}`)
    if (key === '/user/logout') {
      props.clickUserLogout()
    }
  }

  return (
    <Dropdown menu={{ items: operationList, onClick: handleMenuClick }}>
      <div className="icon">
        <Image preview={false} width={30} src={props.userAvatar} />
        <span className="user-name">{props.userName}</span>
      </div>
    </Dropdown>
  )
}

export default User
