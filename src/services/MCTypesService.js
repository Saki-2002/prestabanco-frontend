import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/mc-types/getAll')
}

export default {getAll};