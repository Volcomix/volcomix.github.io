import * as React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import * as injectTapEventPlugin from 'react-tap-event-plugin'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import loggedIn from './reducers'

import App from './containers/App'

let store = createStore(loggedIn)

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin()

render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={null}>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
)