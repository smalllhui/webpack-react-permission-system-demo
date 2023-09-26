import React from 'react'
import { Typography, Image } from 'antd'

const { Title } = Typography

import styles from '../index.module.less'

import ServerErrorImg from '@/assets/images/500.svg'

// @pageDescription:未找到页面

const ServerError: React.FC = () => {
  return (
    <div className={styles.containerStyle}>
      <div className={styles.textCenter}>
        <Image preview={false} src={ServerErrorImg} />
      </div>
      <div className={styles.textCenter}>
        <Title level={2}>抱歉，服务器出错了</Title>
      </div>
    </div>
  )
}

export default ServerError
