import { ActionTypes, AuthAction } from '../actions'

export interface AuthState {
    loggedIn: boolean
    username?: string
}

const loggedIn = (
    state: AuthState = { loggedIn: false },
    action: AuthAction
): AuthState => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return {
                loggedIn: true,
                username: action.username
            }
        case ActionTypes.LOGOUT:
            return { loggedIn: false }
        default:
            return state
    }
}

export default loggedIn