import * as React from 'react'
import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'

import { login, logout } from '../actions'

import Login from '../components/Login'

const mapStateToProps = (state: boolean) => ({
    loggedIn: state
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onLoginClick: () => dispatch(login()),
    onLogoutClick: () => dispatch(logout())
})

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default App