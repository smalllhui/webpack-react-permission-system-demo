import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { notification, Button, Checkbox, Form, Input, Image, Tabs, Row, Col } from 'antd'
import { LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'

// store
import { useAppDispatch, useAppSelector } from '@/store'
import { saveUserInfo, saveUserMenus, saveUserRoutes } from '@/store/modules/LoginUserSlice'
import { saveDefaultMenuSelectedKey, saveBreadcrumbList } from '@/store/modules/LoginUserSlice'

// router
import type { RouteRecordRaw } from '@/router'
import { transformRouter } from '@/router/RouterHelp'

// 网络请求
import { userLoginByAccount, userLoginByPhone, queryUserMenuListByToken } from './login-test-api'

// 样式
import styles from './index.module.less'

type FieldType = {
  userAccount?: string
  password?: string
  remember: boolean
  phoneNumber?: string
  captcha?: string
}

// 校验账号
const validatorUserAccount = (_: any, value: string) => {
  return new Promise((resolve, reject) => {
    if (!value) {
      reject(new Error('Please input your account!'))
    }
    resolve(null)
  })
}
// 校验密码
const validatorUserPwd = (_: any, value: string) => {
  return new Promise((resolve, reject) => {
    if (!value) {
      reject(new Error('Please input your password!'))
    } else if (value.length < 3) {
      reject(new Error('password least 3 characters!'))
    }
    resolve(null)
  })
}

// 账号登录
const AccountLogin: React.FC = () => {
  return (
    <>
      <Form.Item<FieldType> name="userAccount" rules={[{ required: true, validator: validatorUserAccount }]}>
        <Input placeholder="账号:admin/user/guest" prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, validator: validatorUserPwd, validateTrigger: ['onBlur', 'onChange'] }]}
      >
        <Input.Password placeholder="密码:test" prefix={<LockOutlined />} />
      </Form.Item>
    </>
  )
}

// 手机号登录
const PhoneLogin: React.FC = () => {
  return (
    <>
      <Form.Item<FieldType>
        name="phoneNumber"
        rules={[{ required: true, message: 'Please input your cell-phone number!' }]}
      >
        <Input placeholder="请输入手机号!" prefix={<PhoneOutlined />} />
      </Form.Item>

      <Form.Item>
        <Row gutter={8}>
          <Col span={16}>
            <Form.Item<FieldType> name="captcha" noStyle rules={[{ required: true, message: 'Please input captcha!' }]}>
              <Input placeholder="请输入验证码" prefix={<UserOutlined />} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Button>获取验证码</Button>
          </Col>
        </Row>
      </Form.Item>
    </>
  )
}

/**
 * @Description:登录组件
 */
const LoginForm: React.FC = () => {
  const [form] = Form.useForm()
  const [api] = notification.useNotification()

  const dispatch = useAppDispatch()
  const systemStore = useAppSelector(state => state.system)

  const navigate = useNavigate()

  const [activeTabKey, setActiveTabKey] = useState('account') //tab激活的key

  // todo tab选项切换
  const onTabItemClick = (tabKey: string) => {
    form.resetFields()
    setActiveTabKey(tabKey)
  }

  // todo 处理用户登录
  const handleUserLogin = async (formData: any) => {
    console.log('用户登录表单校验success:', formData)
    try {
      let res
      // 1、登录
      if (activeTabKey === 'account') {
        res = await userLoginByAccount(formData.userAccount, formData.password)
      } else {
        res = await userLoginByPhone(formData.userAccount, formData.password)
      }
      dispatch(saveUserInfo({ userInfo: res.data.userInfo, token: res.data.token }))
    } catch (error: any) {
      console.log(error)
      api['error']({
        message: '登录失败',
        description: error.message,
      })
    }

    // 2、查询用户拥有的权限菜单
    const res = await queryUserMenuListByToken()
    const menuList = res.data
    // console.log(menuList)
    // 3、将用户拥有的权限菜单保存到store
    dispatch(saveUserMenus({ menus: menuList }))

    // 2.1、根据权限菜单生成路由菜单
    const routes: RouteRecordRaw[] = transformRouter(menuList)
    if (routes.length > 0) {
      // 保存用户路由
      dispatch(saveUserRoutes({ routes: routes }))
      // 设置改菜单高亮
      dispatch(
        saveDefaultMenuSelectedKey({
          defaultMenuSelectedKeys: [String(menuList[0].id)],
        }),
      )
      // 设置面包屑路径
      const breadcrumbList: string[] = routes[0].meta.paths || []
      dispatch(saveBreadcrumbList({ breadcrumbList }))

      // 3、路由跳转 默认跳转第一个
      navigate(routes[0].path)
    }
  }

  return (
    <div className={styles.formLoginContainer}>
      {/* 登录头部 */}
      <div className={styles.formLoginTop}>
        <div className={styles.formLoginHeader}>
          <Image className={styles.logo} preview={false} width={44} src={systemStore.systemLogo} />
          <span className={styles.formLoginTitle}>{systemStore.loginPageTitle}</span>
        </div>
        <div className={styles.formLoginDesc}>{systemStore.loginPageDesc}</div>
      </div>
      {/* 登录表单 */}
      <div className={styles.formLoginMain}>
        <Form
          name="basic"
          size="large"
          form={form}
          style={{ width: 328 }}
          initialValues={{ remember: true, userAccount: 'admin', password: 'admin' }}
          onFinish={handleUserLogin}
          autoComplete="off"
        >
          <Tabs
            centered
            destroyInactiveTabPane
            defaultActiveKey={activeTabKey}
            items={[
              {
                key: 'account',
                label: '账户密码登录',
                children: <AccountLogin />,
              },
              {
                key: 'phone',
                label: '手机号登录',
                children: <PhoneLogin />,
              },
            ]}
            onChange={onTabItemClick}
          />

          <Form.Item>
            <Row gutter={8}>
              <Col flex="auto">
                <Form.Item<FieldType> name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住密码</Checkbox>
                </Form.Item>
              </Col>
              <Col>
                <a>忘记密码 ?</a>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginBtn}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginForm
