import React from 'react'
import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'

// 按钮类型
import { IButtonProps } from '../ButtonType'

/**
 * 编辑按钮组件
 */
const EditButton: React.FC<IButtonProps> = props => {
  return (
    <Button icon={<EditOutlined />} {...props}>
      编辑
    </Button>
  )
}

export default EditButton
