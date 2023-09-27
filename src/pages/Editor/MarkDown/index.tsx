import React from 'react'
import MarkDown from '@/components/MarkDown'
import styles from './index.module.less'

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser

/**
 * @Description:MarkDown插件使用
 */
const MyMarkDown: React.FC = () => {
  /**
   *值发生改变 子组件触发
   * @param newText 新的文本
   */
  const handleValueChange = (newText: string) => {
    console.log('newText')
    console.log(newText)
  }
  return (
    <div className={styles.containerStyle}>
      <div>MarkDown插件使用</div>
      <MarkDown height="400px" onValueChange={handleValueChange} />
    </div>
  )
}

export default MyMarkDown
