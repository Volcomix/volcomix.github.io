import { Action } from 'redux'

export enum ActionTypes {
    LOGIN,
    LOGOUT
}

export interface AuthAction extends Action {
    type: ActionTypes
    username?: string
}

export const login = (username: string): AuthAction => {
    return {
        type: ActionTypes.LOGIN,
        username
    }
}

export const logout = (): AuthAction => {
    return {
        type: ActionTypes.LOGOUT
    }
}