export var setLoginUser = user => {
    window.localStorage.setItem('$LoginUser', JSON.stringify(user));
}

export var getLoginUser = () => {
    var loginUser = window.localStorage.getItem('$LoginUser');
    if (typeof loginUser === "object") {
        return loginUser;
    } else if (typeof loginUser === 'string') {
        try {
            loginUser = JSON.parse(loginUser);
        } catch (error) {
            loginUser = null;
        }
    } else {
        loginUser = null;
    }
    return loginUser;
}
