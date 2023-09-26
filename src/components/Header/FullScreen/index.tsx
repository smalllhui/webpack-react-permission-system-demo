import React, { useState } from 'react'
import { FullScreenHandle } from 'react-full-screen'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

// 属性
interface childProps {
  screenHandle: FullScreenHandle // 全屏事件对象
}

/**
 * 全屏组件
 */
const FullScreen: React.FC<childProps> = props => {
  const [fullScreenState, setFullScreenState] = useState(false) // 全屏状态的状态标识
  // 改变全屏事件的方法
  const handleChangeFullScreen = () => {
    if (fullScreenState) {
      setFullScreenState(false)
      props.screenHandle
        .exit()
        .then(() => {})
        .catch(err => {
          console.log(err)
        })
    } else {
      setFullScreenState(true)
      props.screenHandle
        .enter()
        .then(() => {})
        .catch(err => {
          console.log(err)
        })
    }
  }
  return (
    <div className="icon" onClick={() => handleChangeFullScreen()}>
      {fullScreenState ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
    </div>
  )
}

export default FullScreen
