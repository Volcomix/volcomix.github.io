import * as React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, useRouterHistory, EnterHook } from 'react-router'
import { createHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'
import * as injectTapEventPlugin from 'react-tap-event-plugin'

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as config from 'config'
import rootReducer, { AppState } from './reducers'

import App from './containers/App'
import Login from './components/Login'

const store = createStore<AppState>(rootReducer)
const browserHistory = useRouterHistory(createHistory)({
    basename: config.basePath
})
const history = syncHistoryWithStore(browserHistory, store)

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const requireAuth: EnterHook = (nextState, replace) => {
    if (!store.getState().authentication.username) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
            <Router history={history}>
                <Route path='/' component={App} onEnter={requireAuth} />
                <Route path='/login' component={Login} />
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
)