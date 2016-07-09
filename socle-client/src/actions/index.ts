import { Action } from 'redux'

export enum ActionTypes {
    LOGIN,
    LOGOUT
}

export interface AuthAction extends Action {
    type: ActionTypes
    username?: string
}

export const login = (username: string): AuthAction => ({
    type: ActionTypes.LOGIN,
    username
})

export const logout = (): AuthAction => ({
    type: ActionTypes.LOGOUT
})