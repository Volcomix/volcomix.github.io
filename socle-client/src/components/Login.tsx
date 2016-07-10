import * as React from 'react'

export interface Props {
    username: string
    isLoggedIn: boolean
    onLogin: (username: string) => void
    onLogout: () => void
}

interface State {
    isValid: boolean
}

export default class Login extends React.Component<Props, State> {
    private usernameInput: HTMLInputElement
    private passwordInput: HTMLInputElement

    constructor(props: Props) {
        super(props)
        this.state = { isValid: false }
    }

    private resetValidity = () => {
        this.setState({ isValid: false })
    }

    private handleInputChange = () => {
        this.setState({
            isValid: !!this.usernameInput.value && !!this.passwordInput.value
        })
    }

    private handleSubmit = () => {
        this.props.onLogin(this.usernameInput.value)
        this.resetValidity()
    }

    render() {
        const { username, isLoggedIn, onLogin, onLogout } = this.props

        if (isLoggedIn) {
            return (
                <div>
                    <span>{username} Logged In</span>
                    <button onClick={onLogout}>Log Out</button>
                </div>
            )
        } else {
            return (
                <form onChange={this.handleInputChange} onSubmit={this.handleSubmit}>
                    <input type='text'
                           placeholder='Username'
                           ref={node => this.usernameInput = node} />
                    <input type='password'
                           placeholder='Password'
                           ref={node => this.passwordInput = node} />
                    <button type='submit' disabled={!this.state.isValid}>
                        Log In
                    </button>
                </form>
            )
        }
    }
}