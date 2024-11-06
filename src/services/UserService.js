import httpClient from "../http-common";

const login = data => {
    return httpClient.post('/api/v1/user/login',data)
}

const register = data => {
    return httpClient.post('/api/v1/user/register',data)
}

export default {login,register};