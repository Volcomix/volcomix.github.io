import * as React from 'react'

interface Props {
    username: string
    loggedIn: boolean
    onLoginClick: (username: string) => void
    onLogoutClick: () => void
}

const Login = ({ username, loggedIn, onLoginClick, onLogoutClick }: Props) => {
    let input: HTMLInputElement

    if (loggedIn) {
        return (
            <div>
                <span>{username} Logged In</span>
                <button onClick={onLogoutClick}>Log Out</button>
            </div>
        )
    } else {
        return (
            <form>
                <input type='text' placeholder='Username' ref={node => input = node}/>
                <input type='password' placeholder='Password' />
                <button onClick={() => onLoginClick(input.value)}>Log In</button>
            </form>
        )
    }
}

export default Login