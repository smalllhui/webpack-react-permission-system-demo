import React from 'react'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/androidstudio.css'

marked.setOptions({
  renderer: new marked.Renderer(),
  // 高亮的语法规范
  highlight: function (code: any, language: any) {
    const validLanguage = hljs.getLanguage(language) ? language : 'javascript'
    return hljs.highlight(code, { language: validLanguage }).value
  },
  gfm: true, // 允许 Git Hub标准的markdown.
  pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
  sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
  breaks: false, // 允许回车换行（该选项要求 gfm 为true）
  smartLists: true, // 使用比原生markdown更时髦的列表
  smartypants: false, // 使用更为时髦的标点
})

/**
 * @Description:ChatGpt MarkDown子组件
 */
const MarkDown: React.FC<{ content: string }> = props => {
  const renderedMarkdown = marked(props.content)
  // react用dangerouslySetInnerHTML解析有html的内容，内容vue中的v-html
  return <div dangerouslySetInnerHTML={{ __html: renderedMarkdown }} />
}

export default MarkDown
