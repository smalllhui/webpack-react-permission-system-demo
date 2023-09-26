import React from 'react'
import { Button } from 'antd'
import { SwapOutlined } from '@ant-design/icons'

// 按钮类型
import { IButtonProps } from '../ButtonType'

/**
 * 展开/折叠按钮组件
 */
const ExpandFoldButton: React.FC<IButtonProps> = props => {
  return (
    <Button icon={<SwapOutlined />} {...props}>
      展开/折叠
    </Button>
  )
}

export default ExpandFoldButton
