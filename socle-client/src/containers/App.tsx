import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { AuthAction, login, logout } from '../actions'
import { AuthState } from '../reducers/authentication'
import { AppState } from '../reducers'

import Login, { Props } from '../components/Login'

const mapStateToProps = (state: AppState) => state.authentication as Props

const mapDispatchToProps = (dispatch: Dispatch<AuthAction>) => ({
    onLogin: (username: string) => dispatch(login(username)),
    onLogout: () => dispatch(logout())
})

const App = connect<AuthState, {}, {}>(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default App