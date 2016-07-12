import { ActionTypes, AuthAction } from '../actions'

export interface AuthState {
    username?: string
}

const authentication = (state: AuthState = {}, action: AuthAction): AuthState => {
    switch (action.type) {
        case ActionTypes.LOGGEDIN:
            return { username: action.username }
        case ActionTypes.LOGGEDOUT:
            return {}
        default:
            return state
    }
}

export default authentication