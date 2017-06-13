import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './state'
import { AuthRoute, GuestRoute } from './authRoutes'

import Layout from './components/Layout'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Themes from './pages/Themes'

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <GuestRoute path='/login' exact component={Login} />
          <GuestRoute path='/' exact component={Home} />
          <GuestRoute path='/themes' exact component={Themes} />
        </Switch>
      </Layout>
    </Router>
  </Provider>
)

export default App
