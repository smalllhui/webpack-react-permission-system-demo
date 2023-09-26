import React from 'react'
import { Breadcrumb } from 'antd'
/**
 * 面包屑组件
 */
interface IProps {
  breadcrumbList: string[]
}
const MyBreadcrumb: React.FC<IProps> = props => {
  const items = props.breadcrumbList.map(title => ({ title }))

  return <Breadcrumb className="breadcrumb" items={items} />
}

export default MyBreadcrumb
