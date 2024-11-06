import httpClient from "../http-common";

const create = data => {
    return httpClient.post('/api/v1/mc-application', data);
}

export default { create };