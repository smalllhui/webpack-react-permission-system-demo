/**
 * Description: 系统logo组件
 */
import React from 'react'
import { Typography, Image } from 'antd'

const { Title } = Typography

interface IProps {
  /**
   * logo图片地址
   */
  logoImgSrc: string
  /**
   * logo高度
   */
  height: number
  /**
   * 是否折叠
   */
  collapsed: boolean
  /**
   * 系统名称
   */
  systemName: string
  /**
   * 字体颜色
   */
  textColor: string
}

const Logo: React.FC<IProps> = props => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        height: props.height + 'px',
        lineHeight: props.height + 'px',
      }}
    >
      <Image preview={false} height={40} src={props.logoImgSrc} />
      {props.collapsed ? (
        ''
      ) : (
        <Title
          level={5}
          style={{
            color: props.textColor,
            paddingLeft: '6px',
            boxSizing: 'border-box',
            height: props.height + 'px',
            lineHeight: props.height + 'px',
            margin: 0,
          }}
        >
          {props.systemName}
        </Title>
      )}
    </div>
  )
}

export default Logo
