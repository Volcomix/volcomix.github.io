import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

import { login, AuthAction } from '../actions'

interface Props {
    dispatch: Dispatch<{}>
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

class Login extends React.Component<Props, State> {
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
        this.props.dispatch(login(this.state.username, this.state.password))
        this.resetForm()
    }

    render() {
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

export default connect()(Login)