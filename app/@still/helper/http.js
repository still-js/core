class HttpRequestOptions {
    headers;
    signal;
    method;
}


class StillHTTPClient {

    static #baseUrl = '';

    static setBaseUrl(baseUrl) {
        StillHTTPClient.#baseUrl = baseUrl;
    }

    /**
     * 
     * @param {string} url 
     * @param {HttpRequestOptions} options 
     * @returns {Promise}
     */
    async get(path, options = {}) {
        const url = `${StillHTTPClient.#baseUrl}${path}`;
        const { headers, method } = options;
        return (await fetch(url, {
            method: method || 'GET',
            headers: headers || {},
        }))
            .json()
    }

    /**
     * 
     * @param {string} url 
     * @param {HttpRequestOptions} options 
     * @returns {Promise}
     */
    async delete(path, body, options = {}) {
        const url = `${StillHTTPClient.#baseUrl}${path}`;
        //return await this.get(url, { ...options, method: 'DELETE' })
        const { headers } = options;
        return (await fetch(url, {
            method: 'DELETE',
            body,
            headers: headers || {},
        }))
            .json();
    }

    /**
     * 
     * @param {string} url 
     * @param {string|JSON|object} body 
     * @param {HttpRequestOptions} options 
     * @returns {Promise}
     */
    async post(path, body, options = {}) {
        const url = `${StillHTTPClient.#baseUrl}${path}`;
        const { headers, method } = options;
        return (await fetch(url, {
            method: method || 'POST',
            body,
            headers: headers || {},
        }))
            .json();
    }

    /**
     * 
     * @param {string} url 
     * @param {string|JSON|object} body 
     * @param {HttpRequestOptions} options 
     * @returns {Promise}
     */
    async put(path, body, options = {}) {
        const url = `${StillHTTPClient.#baseUrl}${path}`;
        return await this.post(path, body, { ...options, method: 'PUT' });
        // url duplicated
        //return await this.post(url, body, { ...options, method: 'PUT' });
    }

    /**
     * 
     * @param {string} url 
     * @param {string|JSON|object} body 
     * @param {HttpRequestOptions} options 
     * @returns {Promise}
     */
    async patch(path, body, options = {}) {
        const url = `${StillHTTPClient.#baseUrl}${path}`;
        return await this.post(url, body, { ...options, method: 'PATCH' });
    }

}