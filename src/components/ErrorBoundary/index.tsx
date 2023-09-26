import { Component, PropsWithChildren } from 'react'

export default class ErrorBoundary extends Component<PropsWithChildren> {
  state = { error: null }
  // 1.通过componentDidCatch
  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error })
    console.log('捕获到错误', error, errorInfo)
  }
  // 2.通过 static getDerivedStateFromError
  //static getDerivedStateFromError(error: Error) {
  //  return { error }
  //}
  render() {
    if (this.state.error) {
      // eslint-disable-next-line react/react-in-jsx-scope
      return <div>我是备用ui</div>
    }

    return this.props.children
  }
}
