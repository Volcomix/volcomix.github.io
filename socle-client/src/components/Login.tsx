import * as React from 'react'

import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

export interface Props {
    username: string
    isLoggedIn: boolean
    onLogin: (username: string) => void
    onLogout: () => void
}

interface State {
    username: string
    password: string
}

export default class Login extends React.Component<Props, State> {

    context: any
    static contextTypes: React.ValidationMap<{}> = {
        muiTheme: React.PropTypes.object.isRequired
    }

    private static initialState = { username: '', password: '' }

    constructor(props: Props) {
        super(props)
        this.state = Login.initialState
    }

    private resetForm() {
        this.setState(Login.initialState)
    }

    private isValid() {
        return this.state.username && this.state.password
    }

    private handleUsernameChange = (event: React.FormEvent) => {
        const input = event.target as HTMLInputElement
        this.setState({ username: input.value, password: this.state.password })
    }
    
    private handlePasswordChange = (event: React.FormEvent) => {
        const input = event.target as HTMLInputElement
        this.setState({ username: this.state.username, password: input.value })
    }

    private handleSubmit = () => {
        this.props.onLogin(this.state.username)
        this.resetForm()
    }

    render() {
        const { username, isLoggedIn, onLogin, onLogout } = this.props

        if (isLoggedIn) {
            return (
                <AppBar
                    title='Home'
                    iconElementRight={
                        <IconMenu
                            iconButtonElement={
                                <IconButton><MoreVertIcon /></IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        >
                            <span
                                style={{
                                    padding: 16,
                                    color: this.context.muiTheme.palette.secondaryTextColor
                                }}
                            >
                                Logged In as <strong>{username}</strong>
                            </span>
                            <Divider />
                            <MenuItem primaryText='Log out' onClick={onLogout} />
                        </IconMenu>
                    }
                />
            )
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        floatingLabelText='Username'
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                    />
                    <TextField
                        floatingLabelText='Password'
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        type='password'
                    />
                    <FlatButton
                        label='Log In'
                        primary={true}
                        disabled={!this.isValid()}
                        type='submit'
                    />
                </form>
            )
        }
    }
}