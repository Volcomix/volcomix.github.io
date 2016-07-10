import * as React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import * as injectTapEventPlugin from 'react-tap-event-plugin'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as config from 'config'
import rootReducer from './reducers'

import App from './containers/App'

const store = createStore(rootReducer)
const history = syncHistoryWithStore(browserHistory, store)

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin()

render(
    <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
        <Provider store={store}>
            <Router history={history}>
                <Route path={config.basePath} component={App} />
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
)