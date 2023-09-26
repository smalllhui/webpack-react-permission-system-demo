import React, { useState } from 'react'
import { ReloadOutlined } from '@ant-design/icons'

interface IProps {
  handleRefresh: () => void
}

/**
 *刷新组件
 */
const Reload: React.FC<IProps> = props => {
  const [reloadState, setReloadState] = useState(false) // 刷新状态的状态标识
  // 刷新
  const handleReload = () => {
    setReloadState(true)
    setTimeout(() => {
      props.handleRefresh()
      setReloadState(false)
    }, 500)
  }
  return (
    <div className="icon" onClick={() => handleReload()}>
      <ReloadOutlined spin={reloadState} />
    </div>
  )
}

export default Reload
