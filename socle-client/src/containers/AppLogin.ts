import { connect, MapDispatchToPropsFunction } from 'react-redux'

import { login } from '../actions'
import Login from '../components/Login'

const mapDispatchToProps: MapDispatchToPropsFunction<{}, {}> = (dispatch) => {
    return {
        onLogin: (username: string, password: string) => dispatch(login(username, password))
    }
}

const AppLogin = connect(
    null,
    mapDispatchToProps
)(Login)

export default AppLogin