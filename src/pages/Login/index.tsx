import React from 'react'
import styles from './index.module.less'
import Language from '@/components/Header/Language'
import LoginForm from './LoginForm'

import LoginBackGroundImage from '@/assets/images/login-bg.svg'

/**
 * @Description:用户登录页面
 */
const Login: React.FC = () => {
  return (
    <div className={styles.containerStyle} style={{ backgroundImage: `url(${LoginBackGroundImage})` }}>
      {/* 语言模块 */}
      <div className={styles.languageStyle}>
        <Language isLoginPage={true} />
      </div>
      {/* 登录组件 */}
      <LoginForm />
    </div>
  )
}

export default Login
