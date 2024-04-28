import React from 'react'
import Login from 'components/Login'
import Schedule from 'components/Schedule'
import Messages from 'components/Messages'
import Activity from 'components/Activity'
import Settings from 'components/Settings'
import Main from 'components/Main'
import Tasks from 'components/Tasks'
import { GlobalStyle } from 'components/Common/GlobalStyle'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/activity' component={Activity} />
          <Route exact path='/schedule' component={Schedule} />
          <Route exact path='/messages' component={Messages} />
          <Route exact path='/dashboard' component={Main} />
          <Route exact path='/tasks' component={Tasks} />
          <Route path='/' component={Login} />
        </Switch>
      </Router>
      <GlobalStyle />
    </>
  )
}

export default App
