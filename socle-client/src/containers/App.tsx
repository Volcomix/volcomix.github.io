import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AuthAction, login, logout } from '../actions'
import { AuthState } from '../reducers'

import Login, { Props } from '../components/Login'

const mapStateToProps = (state: AuthState) => state as Props

const mapDispatchToProps = (dispatch: Dispatch<AuthAction>) => ({
    onLoginClick: (username: string) => dispatch(login(username)),
    onLogoutClick: () => dispatch(logout())
})

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default App