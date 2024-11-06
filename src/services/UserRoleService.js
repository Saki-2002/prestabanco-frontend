import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/user-role/getAll')
}

export default {getAll};