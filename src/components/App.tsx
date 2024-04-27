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
  console.log('app')
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route path='/settings' component={Settings} />
          <Route path='/activity' component={Activity} />
          <Route path='/schedule' component={Schedule} />
          <Route path='/messages' component={Messages} />
          <Route path='/dashboard' component={Main} />
          <Route path='/tasks' component={Tasks} />
          <Route path='/' component={Login} />
        </Switch>
      </Router>
      <GlobalStyle />
    </>
  )
}

export default App
