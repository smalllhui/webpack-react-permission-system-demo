import React from 'react'
import { Typography, Image } from 'antd'

const { Title } = Typography

import styles from '../index.module.less'

import NotFoundImg from '@/assets/images/404.svg'

// @pageDescription:未找到页面

const NotFound: React.FC = () => {
  return (
    <div className={styles.containerStyle}>
      <div className={styles.textCenter}>
        <Image preview={false} src={NotFoundImg} />
      </div>
      <div className={styles.textCenter}>
        <Title level={2}>抱歉，你访问的页面不存在</Title>
      </div>
    </div>
  )
}

export default NotFound
