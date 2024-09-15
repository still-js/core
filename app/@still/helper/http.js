class HttpRequestOptions {
    headers;
    signal;
    method;
}


class StillHTTPClient {


    /**
     * 
     * @param {string} url 
     * @param {HttpRequestOptions} options 
     * @returns {Promise}
     */
    async get(url, options = {}){
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
    async delete(url, options = {}){
        return await this.get(url, { ...options, method: 'DELETE' })
    }

    /**
     * 
     * @param {string} url 
     * @param {string|JSON|object} body 
     * @param {HttpRequestOptions} options 
     * @returns {Promise}
     */
    async post(url, body, options = {}){
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
    async put(url, body, options = {}){
        return await this.post(url, body, {...options, method: 'PUT'});
    }

    /**
     * 
     * @param {string} url 
     * @param {string|JSON|object} body 
     * @param {HttpRequestOptions} options 
     * @returns {Promise}
     */
    async patch(url, body, options = {}){
        return await this.post(url, body, {...options, method: 'PATCH'});
    }

}