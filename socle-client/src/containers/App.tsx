import * as React from 'react'
import { Dispatch } from 'redux'
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux'

import { AuthAction, login, logout } from '../actions'
import { AuthState } from '../reducers/authentication'
import { AppState } from '../reducers'

import Home, { Props } from '../components/Home'

const mapStateToProps: MapStateToProps<Props, {}> = (state: AppState) => {
    return {
        username: state.authentication.username
    } as Props
}

const mapDispatchToProps: MapDispatchToPropsFunction<{}, {}> = (dispatch) => {
    return {
        onLogout: () => dispatch(logout())
    }
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

export default App