import React from 'react'
import { Typography, Image } from 'antd'

const { Title } = Typography

import styles from '../index.module.less'

import NoPermissionImg from '@/assets/images/403.svg'

// @pageDescription:无权限页面

const NoPermission: React.FC = () => {
  return (
    <div className={styles.containerStyle}>
      <div className={styles.textCenter}>
        <Image preview={false} src={NoPermissionImg} />
      </div>
      <div className={styles.textCenter}>
        <Title level={2}>抱歉，你无权访问该页面</Title>
      </div>
    </div>
  )
}

export default NoPermission
