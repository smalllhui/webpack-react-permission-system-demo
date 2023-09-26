import React from 'react'
import { Badge } from 'antd'
import { BellOutlined } from '@ant-design/icons'

interface PropsType {
  infoTotal: number
}
/**
 *消息组件
 */
const NavInfo: React.FC<PropsType> = props => {
  return (
    <div className="icon info">
      <Badge offset={[0, -5]} overflowCount={99} count={props.infoTotal}>
        <BellOutlined />
      </Badge>
    </div>
  )
}

export default NavInfo
