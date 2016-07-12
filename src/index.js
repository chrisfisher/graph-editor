import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import App from './components/App'
import { loadState, saveState } from './utils/localStorage'
import throttle from 'lodash/throttle'

const initialState = loadState()

const middleware = [ thunk ]

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
)

store.subscribe(throttle(() => {
  saveState(store.getState())
}, 1000))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)