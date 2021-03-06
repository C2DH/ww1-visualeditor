import React from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './state'
import { AuthRoute, GuestRoute } from './authRoutes'
import { getBoundingBoxImage } from './utils'

import Layout from './components/Layout'
import FullPageWidgets from './components/FullPageWidgets'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Themes from './pages/Themes'
import NewTheme from './pages/NewTheme'
import Theme from './pages/Theme'
import StaticStory from './pages/StaticStory'
import Educationals from './pages/Educationals'
import NewEducational from './pages/NewEducational'
import EducationalDetail from './pages/EducationalDetail'

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <FullPageWidgets>
          <Switch>
            <GuestRoute path='/login' exact component={Login} />
            <AuthRoute path='/' exact component={Home} />
            <AuthRoute path='/themes' exact component={Themes} />
            <AuthRoute path='/themes/new' exact component={NewTheme} />
            <AuthRoute path='/themes/:themeId' component={Theme} />
            <AuthRoute path='/static/:staticStoryId' component={StaticStory} />
            <AuthRoute path='/educationals' exact component={Educationals} />
            <AuthRoute path='/educationals/new' component={NewEducational} />
            <AuthRoute path='/educationals/:educationalId' component={EducationalDetail} />
            <Redirect to='/' />
          </Switch>
        </FullPageWidgets>
      </Layout>
    </Router>
  </Provider>
)

export default App
