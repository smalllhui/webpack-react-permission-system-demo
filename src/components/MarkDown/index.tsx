import React from 'react'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
// 参数配置：https://github.com/HarryChen0506/react-markdown-editor-lite/blob/master/docs/configure.zh-CN.md
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
// 可以去 https://highlightjs.org/examples 查看样式效果
// 导入主题样式 去highlight.js/styles里面选一个自己喜欢的 然后复制出来
// import '@/assets/styles/css/github.css'

// const mdParser = new MarkdownIt(/* Markdown-it options */)
const mdParser = new MarkdownIt({
  highlight: (str, lang) => {
    let code: any = mdParser.utils.escapeHtml(str)
    if (lang && hljs.getLanguage(lang)) {
      code = hljs.highlight(lang, str, true).value
    }
    return `<pre class="hljs"><code>${code}</code></pre>`
  },
})

interface IPros {
  /**
   * 默认值
   */
  value?: string
  /**
   * 高度
   */
  height?: string

  /**
   * 将最新值传递给父组件
   * @param newHtmlStr
   */
  onValueChange: (newHtmlStr: string) => void
}
/**
 * @Description:MarkDown组件
 */
const DEFAULT_HEIGHT = '300px' // 默认高度
const MyMarkDown: React.FC<IPros> = ({ value, height, onValueChange }) => {
  // Finish!
  const handleEditorChange = (data: any) => {
    onValueChange(data.text)
  }

  /**
   * 自定义上传图片
   * @param file
   */
  const handleUploadImg = (file: File) => {
    const formData = new FormData()
    formData.append('quill-image', file)
    // const res = await uploadFile(formData)
    // 返回的图片url
    const url = 'https://t11.baidu.com/it/u=2367737883,4291674407&fm=58&app=83&f=JPEG?w=200&h=266'
    return Promise.resolve(url)
  }

  return (
    <MdEditor
      style={{ height: height || DEFAULT_HEIGHT }}
      value={value}
      renderHTML={text => mdParser.render(text)}
      onImageUpload={handleUploadImg}
      onChange={handleEditorChange}
    />
  )
}

export default MyMarkDown
