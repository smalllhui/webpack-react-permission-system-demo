import React, { useState } from 'react'
import { Button } from 'antd'
import styles from './index.module.less'

/**
 * @Description:
 */
const Index: React.FC = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count + 1)
  }
  return (
    <div>
      <div className={styles.test}>count:{count}</div>
      <button onClick={handleClick}>+1</button>
      <Button type="primary">Primary Button</Button>
    </div>
  )
}

export default Index
