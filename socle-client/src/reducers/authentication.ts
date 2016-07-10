import { ActionTypes, AuthAction } from '../actions'

export interface AuthState {
    isLoggedIn: boolean
    username?: string
}

const initialState: AuthState = { isLoggedIn: false }

const authentication = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return { isLoggedIn: true, username: action.username }
        case ActionTypes.LOGOUT:
            return { isLoggedIn: false }
        default:
            return state
    }
}

export default authentication