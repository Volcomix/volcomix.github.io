import { Action, Dispatch } from 'redux'
import { push } from 'react-router-redux'

export enum ActionTypes {
    LOGIN,
    LOGGEDIN,
    LOGOUT,
    LOGGEDOUT
}

export interface AuthAction extends Action {
    type: ActionTypes
    username?: string
    password?: string
}

export const loggedIn = (username: string): AuthAction => {
    return {
        type: ActionTypes.LOGGEDIN,
        username
    }
}

export const login = (username: string, password: string) => {
    return (dispatch: Dispatch<any>) => {
        setTimeout(() => {
            dispatch(loggedIn(username))
            dispatch(push('/'))
        }, 1000)
    }
}

export const loggedOut = () => {
    return {
        type: ActionTypes.LOGGEDOUT
    }
}

export const logout = () => {
    return (dispatch: Dispatch<any>) => {
        dispatch(loggedOut())
        dispatch(push('/login'))
    }
}