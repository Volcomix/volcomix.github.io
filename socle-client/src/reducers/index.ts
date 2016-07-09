const loggedIn = (state = false, action: { type: string }) => {
    switch (action.type) {
        case 'LOGIN':
            return true
        case 'LOGOUT':
            return false
        default:
            return state
    }
}

export default loggedIn