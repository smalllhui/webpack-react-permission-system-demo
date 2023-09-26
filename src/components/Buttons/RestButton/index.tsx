import React from 'react'
import { Button } from 'antd'

// 按钮类型
import { IButtonProps } from '../ButtonType'

/**
 * 重置按钮组件
 */
const RestButton: React.FC<IButtonProps> = props => {
  return <Button {...props}>重置</Button>
}

export default RestButton
