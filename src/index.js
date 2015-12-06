'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import Router, { Route } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import io from 'socket.io-client'
import reducer from './reducer'
import { setState } from './actions'
import remoteAction from './middleware/remote-action'
import App from './components/App'
import { VotingContainer } from './components/Voting'
import { ResultsContainer } from './components/Results'

const socket = io(`${location.protocol}//${location.hostname}:8090`)
socket.on('state', state =>
  store.dispatch(setState(state))
)

const createStoreWithMiddleWare = applyMiddleware(
  remoteAction(socket)
)(createStore)
const store = createStoreWithMiddleWare(reducer)

const routes = (
  <Route component={ App }>
    <Route path="/" component={ VotingContainer } />
    <Route path="/results" component={ ResultsContainer } />
  </Route>
)

ReactDOM.render(
  <Provider store={ store }>
    <Router>{ routes }</Router>
  </Provider>,
  document.querySelector('#app')
)
