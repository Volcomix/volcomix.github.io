import * as React from 'react'

import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { MuiTheme } from 'material-ui/styles'

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

const styles = {
    form: {
        maxWidth: 300,
        height: '100%',
        margin: 'auto'
    },
    input: {
        width: '100%'
    }
}

const initialState = { username: '', password: '' }

export default class Login extends React.Component<Props, State> {

    // secondaryTextColor missing from Typescript Definition file
    context: { muiTheme: MuiTheme & { palette: { secondaryTextColor: string } } }

    static contextTypes: React.ValidationMap<{}> = {
        muiTheme: React.PropTypes.object.isRequired
    }

    constructor(props: Props) {
        super(props)
        this.state = initialState
    }

    private resetForm() {
        this.setState(initialState)
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

    private handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
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
                            <span style={{
                                padding: 16,
                                color: this.context.muiTheme.palette.secondaryTextColor
                            }}>
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
                <form onSubmit={this.handleSubmit} style={styles.form}>
                    <Card>
                        <CardTitle title="Log in to your account" />
                        <CardText>
                            <TextField
                                floatingLabelText='Username'
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                                style={styles.input}
                            />
                            <TextField
                                floatingLabelText='Password'
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                style={styles.input}
                                type='password'
                            />
                        </CardText>
                        <CardActions>
                            <FlatButton
                                label='Log In'
                                primary={true}
                                disabled={!this.isValid()}
                                style={styles.input}
                                type='submit'
                            />
                        </CardActions>
                    </Card>
                </form>
            )
        }
    }
}