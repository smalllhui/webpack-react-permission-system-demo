import React from 'react'
import styles from './index.module.less'

import QuillRichTextEditor from '@/components/QuillRichTextEditor'
/**
 * @Description:RichTextEditor富文本编辑器的使用
 */
const RichTextEditor: React.FC = () => {
  const onValueChange = (htmlStr: string) => {
    console.log('htmlStr')
    console.log(htmlStr)
  }
  return (
    <div className={styles.containerStyle}>
      <div className={styles.title}>富文本编辑器使用</div>
      <div className={styles.richEditorStyle}>
        <QuillRichTextEditor onValueChange={onValueChange} />
      </div>
    </div>
  )
}

export default RichTextEditor
