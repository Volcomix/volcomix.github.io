import * as React from 'react'
import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'

import { login, logout } from '../actions'

import Login from '../components/Login'

const mapStateToProps = (state: { loggedIn: boolean, username: string }) => (
    state
)

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onLoginClick: (username: string) => dispatch(login(username)),
    onLogoutClick: () => dispatch(logout())
})

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default App