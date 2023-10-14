import React, { useRef, useState } from 'react'
import { Button, Input } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import MarkDown from './MarkDown'
import styles from './index.module.less'

const { TextArea } = Input

const endpoint = 'https://api.openai.com/v1/chat/completions' // ChatGPT API端点
const apiKey = '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' // 替换为您的ChatGPT API密钥

/**
 * @Description:简单版GPT页面
 */
const SimpleVersion: React.FC = () => {
  const currentProblem = useRef<string>('')
  const [contentValue, setContentValue] = useState<string>('')
  const [answerList, setAnswerList] = useState<{ problem: string; answer: string }[]>([])

  const sendToChatGpt = () => {
    const requestData = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: contentValue,
        },
      ],
    }
    currentProblem.current = contentValue
    setContentValue('')

    fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        // 处理ChatGPT的响应
        const assistantResponse = data.choices[0].message.content
        setAnswerList(preAnswerList => [
          ...preAnswerList,
          { problem: currentProblem.current, answer: assistantResponse },
        ])
      })
      .catch(error => {
        console.error('发生错误：', error)
      })
  }

  return (
    <div className={styles.containerStyle}>
      <div className={styles.answerList}>
        <Scrollbars>
          {answerList.map((item, index) => {
            return (
              <div className={styles.answerItem} key={index}>
                <div className={styles.askTitle}>
                  <span>{item.problem}</span>
                </div>
                <div className={styles.answerContent}>
                  <MarkDown content={item.answer} />
                </div>
              </div>
            )
          })}
        </Scrollbars>
      </div>
      <div className={styles.chatFooter}>
        <div className={styles.inputStyle}>
          <TextArea
            autoSize={{ minRows: 1, maxRows: 4 }}
            bordered={false}
            style={{ resize: 'none' }}
            value={contentValue}
            onChange={e => setContentValue(e.target.value)}
            placeholder="Talk to Assistant on Poe"
          />
        </div>
        <div className={styles.buttonStyle}>
          <Button type="primary" onClick={sendToChatGpt}>
            发送
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SimpleVersion
