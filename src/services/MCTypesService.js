import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('api/v1/mc-types/')
}

export default {getAll};