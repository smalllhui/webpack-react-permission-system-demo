import React, { useEffect, useRef, useState } from 'react'
import { Tag } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Scrollbars } from 'react-custom-scrollbars'
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
   * 根据path关闭tag
   */
  onCloseTagByPath: (path: string) => void
  /**
   * 切换路由并且激活path
   */
  onSwitchRoutePath: (path: string) => void
}

/**
 * @Description:tagVies标签列表组件
 */
const TagScrollList: React.FC<IProps> = props => {
  const scrollRef = useRef<any>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [isShowBtn, setIsShowBtn] = useState(false)

  useEffect(() => {
    if (scrollRef.current && listRef.current) {
      // 父盒子可视区大小
      const parentWidth = scrollRef.current.getClientWidth()
      // tag列表盒子的大小含滚动区域
      const tagListWidth = listRef.current.scrollWidth
      // 是否显示左右按钮
      setIsShowBtn(tagListWidth > parentWidth)
    }
  }, [])

  // !todo 滚动事件
  const handleScrollLeft = (left: number, isAdd?: boolean) => {
    if (isAdd) {
      left += scrollRef.current.getScrollLeft()
    }
    scrollRef.current.scrollLeft(left)
  }

  // 往前滚动
  const back = () => {
    handleScrollLeft(0 - scrollRef.current.getClientWidth() / 2, true)
  }
  // 往后滚动
  const go = () => {
    handleScrollLeft(scrollRef.current.getClientWidth() / 2, true)
  }

  // 点击tag
  const handleTagClick = (tabObj: TagType, index: number, e: any) => {
    props.onSwitchRoutePath(tabObj.path) // 切换路由
    if (index === 0 || index === props.tagList.length - 1) {
      handleScrollLeft(e.target.offsetLeft)
      return
    }
    // 前一个兄弟节点
    const preSibling = e.target.previousElementSibling
    // 后一个兄弟节点
    const nextSibling = e.target.nextElementSibling

    // 获取scrollPane可视区宽度
    const parentWidth = scrollRef.current.getClientWidth()
    // 获取scrollPane已经滚出距离
    const parentLeft = scrollRef.current.getScrollLeft()
    // 滚出距离+可视区宽度
    const parentRight = parentWidth + parentLeft

    // 前一个tag的偏移
    const lastLeft = preSibling.offsetLeft

    // 当前tag的偏移
    const currentTagOffsetLeft = e.target.offsetLeft
    // 当前tag的宽度
    const currentTagWidth = e.target.offsetWidth
    // 当前tag的滚出距离+可视区宽度
    const currentTagRight = currentTagOffsetLeft + currentTagWidth

    // 下一个tag的偏移
    const nextLeft = nextSibling.offsetLeft
    // 下一个tag的宽度
    const nextWidth = nextSibling.offsetWidth
    // 下一个tag滚出距离+可视区宽度
    const nextRight = nextLeft + nextWidth

    if (parentWidth <= currentTagRight - lastLeft || parentWidth <= nextRight - currentTagOffsetLeft) {
      handleScrollLeft(currentTagOffsetLeft)
    } else if (lastLeft < parentLeft) {
      handleScrollLeft(lastLeft)
    } else if (nextRight > parentRight) {
      handleScrollLeft(nextRight - parentWidth)
    }
  }

  // 根据path关闭tag
  const handleCloseTag = (path: string) => {
    props.onCloseTagByPath(path)
  }

  return (
    <div className="tag-container">
      {isShowBtn && (
        <div className="tag-btn" onClick={back}>
          <LeftOutlined />
        </div>
      )}

      <div className="tag-main">
        {/* renderTrackHorizontal={props => <div {...props}></div>} 去除滚动条 */}
        <Scrollbars ref={scrollRef} renderTrackHorizontal={props => <div {...props}></div>}>
          <div className="tag-list" ref={listRef}>
            {props.tagList.map((item, index) => {
              return (
                <Tag
                  className="my-tag"
                  closable={index > 0}
                  style={{ color: item.path === props.activePath ? '#2d8cf0' : '' }}
                  key={item.path}
                  bordered={false}
                  onClick={e => handleTagClick(item, index, e)}
                  onClose={e => {
                    e.preventDefault()
                    handleCloseTag(item.path)
                  }}
                >
                  {item.name}
                </Tag>
              )
            })}
          </div>
        </Scrollbars>
      </div>
      {isShowBtn && (
        <div className="tag-btn" onClick={go}>
          <RightOutlined />
        </div>
      )}
    </div>
  )
}

export default TagScrollList
