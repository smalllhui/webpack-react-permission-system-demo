import React, { useState } from 'react'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'
import IconFont from '@/components/IconFont'

// 语言列表
import languageList from '@/i18n/language'

/**
 * 语言选择组件
 */
const Language: React.FC<{ isLoginPage?: boolean }> = ({ isLoginPage }) => {
  const { t, i18n } = useTranslation()
  const [selectedKeys, setSelectedKeys] = useState([i18n.language])

  const languageItems: MenuProps['items'] = languageList.map(item => ({
    key: item.key,
    label: (
      <a onClick={e => e.preventDefault()} rel="noopener noreferrer">
        {t(`${item.language}`)}
      </a>
    ),
  }))

  // 切换语言事件
  const onChangeLanguage: MenuProps['onClick'] = ({ key }) => {
    setSelectedKeys([key])
    i18n.changeLanguage(key)
  }

  return (
    <Dropdown
      menu={{
        items: languageItems,
        selectable: true,
        defaultSelectedKeys: selectedKeys,
        onClick: onChangeLanguage,
      }}
      placement="topRight"
    >
      {isLoginPage ? (
        <IconFont type="icon-a-2" />
      ) : (
        <div className="icon">
          <IconFont type="icon-a-2" />
        </div>
      )}
    </Dropdown>
  )
}

export default Language
