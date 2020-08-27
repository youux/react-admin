import React from 'react'
import { BrowserRouter, Switch, Route, Redirect, useLocation } from 'react-router-dom'
import Cookie from 'js-cookie'

// 全局路由
import router, { RouteType } from './router/index'
// 重置全局样式
import './assets/css/react.css'

// 类型集合
export interface AppProps {}

// 强制重定向到 /login 页面
const ToLogin = () => {
  let location = useLocation()
  return location.pathname === '/' ? <Redirect exact from='/' to='/login' /> : null
}

// 子页面
const SubRoutes = (route: RouteType) => {
  let isBool = !route.requireAuth || !!Cookie.get('CGB-BP-USER')
  return isBool ? <Route path={route.path} render={(props) => <route.component {...props} routes={route.routes} />} /> : <ToLogin />
}

// 页面主体
const App: React.SFC<AppProps> = () => {
  return (
    <BrowserRouter>
      <Switch>
        {router.map((route, i) => (
          <SubRoutes key={i} {...route} />
        ))}
      </Switch>
    </BrowserRouter>
  )
}

export default App
