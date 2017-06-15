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
import ThemeDetail from './pages/ThemeDetail'
import ThemeEdit from './pages/ThemeEdit'
import Chapter from './pages/Chapter'
import ChapterEdit from './pages/ChapterEdit'
import Module from './pages/Module'
import Translate from './pages/Translate'
import Documents from './pages/Documents'
import DocumentEdit from './pages/DocumentEdit'
import TestControlled from './pages/TestControlled'


const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <GuestRoute path='/login' exact component={Login} />
          <GuestRoute path='/' exact component={Home} />
          <GuestRoute path='/themes' exact component={Themes} />
          <GuestRoute path='/themes/:themeId' exact component={ThemeDetail} />
          <GuestRoute path='/themes/:themeId/edit' exact component={ThemeEdit} />
          <GuestRoute path='/themes/:themeId/chapters/:chapterId' exact component={Chapter} />
          <GuestRoute path='/themes/:themeId/chapters/:chapterId/edit' exact component={ChapterEdit} />
          <GuestRoute path='/themes/:themeId/chapters/:chapterId/modules/:moduleId' exact component={Module} />
          {/* temporary path */}
          <GuestRoute path='/translate' exact component={Translate} />
          <GuestRoute path='/docs' exact component={Documents} />
          <GuestRoute path='/docs/:docId/edit' exact component={DocumentEdit} />
          <GuestRoute path='/test' exact component={TestControlled} />

        </Switch>
      </Layout>
    </Router>
  </Provider>
)

export default App
