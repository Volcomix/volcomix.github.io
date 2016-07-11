import * as React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'
import * as injectTapEventPlugin from 'react-tap-event-plugin'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as config from 'config'
import rootReducer from './reducers'

import App from './containers/App'
import Login from './components/Login'

const store = createStore(rootReducer)
const browserHistory = useRouterHistory(createHistory)({
    basename: config.basePath
})
const history = syncHistoryWithStore(browserHistory, store)

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
            <Router history={history}>
                <Route path='/' component={App} />
                <Route path='/login' component={Login} />
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
)