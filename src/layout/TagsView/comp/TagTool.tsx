import React from 'react'
import { ConfigProvider, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { DownOutlined, RedoOutlined, CloseOutlined, CloseCircleOutlined } from '@ant-design/icons'

interface IProps {
  /**
   * 刷新事件
   */
  onRefresh: () => void
  /**
   * 关闭当前事件
   */
  onCloseCurrent: () => void
  /**
   * 关闭其它事件
   */
  onCloseOther: () => void
}

const items: MenuProps['items'] = [
  {
    key: 'refresh',
    label: <span>刷新当前</span>,
    icon: <RedoOutlined />,
  },
  {
    key: 'closeCurrent',
    label: <a target="_blank">关闭当前</a>,
    icon: <CloseOutlined />,
  },
  {
    key: 'closeOther',
    label: <a target="_blank">关闭其它</a>,
    icon: <CloseCircleOutlined />,
  },
]

/**
 * @Description: tagView操作组件
 */
const TagTool: React.FC<IProps> = props => {
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'refresh') {
      console.log('刷新当前')
      props.onRefresh()
    } else if (key === 'closeCurrent') {
      console.log('关闭当前')
      props.onCloseCurrent()
    } else if (key === 'closeOther') {
      console.log('关闭其它')
      props.onCloseOther()
    }
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: 'rgb(31, 34, 37)',
            algorithm: true, // 启用算法
          },
          Dropdown: {
            // controlItemBgHover: '#1677ff',
            algorithm: true, // 启用算法
          },
        },
      }}
    >
      <Dropdown menu={{ items, onClick }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
        <div className="tag-btn">
          <DownOutlined />
        </div>
      </Dropdown>
    </ConfigProvider>
  )
}

export default TagTool
