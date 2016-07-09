import * as React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import loggedIn from './reducers'

import App from './containers/App'

let store = createStore(loggedIn)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)