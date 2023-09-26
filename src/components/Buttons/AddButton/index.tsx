import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

// 按钮类型
import { IButtonProps } from '../ButtonType'

/**
 * 新增按钮组件
 */
const AddButton: React.FC<IButtonProps> = props => {
  return (
    <Button icon={<PlusOutlined />} {...props}>
      新增
    </Button>
  )
}

export default AddButton
