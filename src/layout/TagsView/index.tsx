import React from 'react'
// 导入子组件爱你
import TagTool from './comp/TagTool'
import TagScrollList from './comp/TagScrollList'
// 导入自定义类型
import type { TagType } from '@/types/ITag'

// tag滚动标签列表组件属性参数
interface IProps {
  /**
   * tag列表
   */
  tagList: Array<TagType>
  /**
   * 当前激活的path
   */
  activePath: string
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
  /**
   * 根据path关闭tag
   */
  onCloseTagByPath: (path: string) => void
  /**
   * 激活path
   */
  onSwitchRoutePath: (path: string) => void
}

// 导入样式
import './index.less'
/**
 * @Description:tag滚动标签列表组件
 */
const TagsView: React.FC<IProps> = props => {
  return (
    <div className="tags-view">
      <TagScrollList
        tagList={props.tagList}
        activePath={props.activePath}
        onCloseTagByPath={props.onCloseTagByPath}
        onSwitchRoutePath={props.onSwitchRoutePath}
      />
      <div className="tool-warper">
        <TagTool onCloseCurrent={props.onCloseCurrent} onCloseOther={props.onCloseOther} onRefresh={props.onRefresh} />
      </div>
    </div>
  )
}

export default TagsView
