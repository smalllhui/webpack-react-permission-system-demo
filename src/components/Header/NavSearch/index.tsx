import React from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
/**
 * 搜索组价
 */
const NavSearch = () => {
  return (
    <div className="icon">
      <SearchOutlined />
      <Input placeholder="Basic usage" size="small" style={{ marginLeft: '10px' }} />
    </div>
  )
}

export default NavSearch
