import React from 'react'
import styles from './index.module.less'

import { AddButton, EditButton, RestButton, SearchButton } from '@/components/Buttons'

import PermissionButton from '@/auth/PermissionButton'

/**
 * @Description:首页页面
 */
const Home: React.FC = () => {
  const onBtnClick = () => {
    console.log('9999')
  }
  return (
    <div className={styles.containerStyle}>
      <div>按钮权限:有权限、显示;没有权限:可禁用、或者不渲染该按钮</div>
      <PermissionButton authCode="add">
        <AddButton onClick={onBtnClick} />
      </PermissionButton>
      <PermissionButton authCode="edit" isDisable={true}>
        <EditButton />
      </PermissionButton>
      {/* 没有权限 禁用 */}
      <PermissionButton authCode="reset" isDisable={true}>
        <RestButton />
      </PermissionButton>
      {/* 没有权限 不显示按钮 */}
      <PermissionButton authCode="search">
        <SearchButton />
      </PermissionButton>
    </div>
  )
}

export default Home
