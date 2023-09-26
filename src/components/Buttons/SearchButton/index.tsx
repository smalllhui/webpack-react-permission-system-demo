import React from 'react'
import { Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

// 按钮类型
import { IButtonProps } from '../ButtonType'

/**
 * 查询按钮组件
 */
const SearchButton: React.FC<IButtonProps> = props => {
  return (
    <Button icon={<SearchOutlined />} {...props}>
      查询
    </Button>
  )
}

export default SearchButton
