import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './state'
import { AuthRoute, GuestRoute } from './authRoutes'

import Layout from './components/Layout'
import FullPageWidgets from './components/FullPageWidgets'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Themes from './pages/Themes'
import NewTheme from './pages/NewTheme'
import Theme from './pages/Theme'
// import Chapter from './pages/Chapter'
// import ChapterEdit from './pages/ChapterEdit'
// import Module from './pages/Module'
import Translate from './pages/Translate'
// import Documents from './pages/Documents'
// import DocumentEdit from './pages/DocumentEdit'
// import TestControlled from './pages/TestControlled'

// const Fullo = () => (
//   <div>I am fulllo!</div>
// )

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
            <AuthRoute path='/translate' exact component={Translate} />
            {/* <AuthRoute path='/themes/:themeId/edit' exact component={ThemeEdit} />
            <AuthRoute path='/themes/:themeId/chapters/:chapterId' exact component={Chapter} />
            <AuthRoute path='/themes/:themeId/chapters/:chapterId/edit' exact component={ChapterEdit} />
            <AuthRoute path='/themes/:themeId/chapters/:chapterId/modules/:moduleId' exact component={Module} /> */}
            {/* temporary path */}
            {/* <AuthRoute path='/translate' exact component={Translate} />
            <AuthRoute path='/docs' exact component={Documents} />
            <AuthRoute path='/docs/:docId/edit' exact component={DocumentEdit} />
            <AuthRoute path='/test' exact component={TestControlled} /> */}
          </Switch>
        </FullPageWidgets>
      </Layout>
    </Router>
  </Provider>
)

export default App
