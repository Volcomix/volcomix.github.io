import * as React from 'react'

interface Props {
    loggedIn: boolean
    onLoginClick: () => void
    onLogoutClick: () => void
}

const Login = ({ loggedIn, onLoginClick, onLogoutClick }: Props) => {
    if (loggedIn) {
        return (
            <div>
                <span>Logged In</span>
                <button onClick={onLogoutClick}>Log Out</button>
            </div>
        )
    } else {
        return (
            <form>
                <input type='text' placeholder='Username' />
                <input type='password' placeholder='Password' />
                <button onClick={onLoginClick}>Log In</button>
            </form>
        )
    }
}

export default Login