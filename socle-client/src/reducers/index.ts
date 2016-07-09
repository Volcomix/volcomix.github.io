const loggedIn = (
    state: { loggedIn: boolean, username?: string } = { loggedIn: false },
    action: { type: string, username?: string }
): { loggedIn: boolean, username?: string } => {
    switch (action.type) {
        case 'LOGIN':
            return {
                loggedIn: true,
                username: action.username
            }
        case 'LOGOUT':
            return { loggedIn: false }
        default:
            return state
    }
}

export default loggedIn