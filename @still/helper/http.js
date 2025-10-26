import { StillAppSetup } from "../../config/app-setup.js";

class HttpRequestOptions {
    headers;
    signal;
    method;
}


export class StillHTTPClient {

    static #baseUrl = null;

    static setBaseUrl(baseUrl) {
        StillHTTPClient.#baseUrl = baseUrl;
    }

    static getBaseUrl(){
        return StillHTTPClient.#baseUrl;
    }

    static getURL(p = '') {
        const env = StillAppSetup.config.env;
        StillHTTPClient.#baseUrl = StillHTTPClient.#baseUrl || StillAppSetup.config.get(`httpClient.baseUrl`);
        if (p.startsWith('http://') || p.startsWith('https://')) return p;
        return `${StillHTTPClient.#baseUrl}${p}`;
    }

    /**
     * @param {string} url 
     * @param {HttpRequestOptions} options 
     * @returns {Promise<{text: Function, json: Function}>} */
    async get(path, options = {}) {
        const url = StillHTTPClient.getURL(path);
        const { headers, method } = options;

        try {            
            const response = (await fetch(url, {
                method: method || 'GET',
                headers: headers || {},
            }))
            return response;
        } catch (error) {
            return error;
        }

    }

    /**
     * @param {string} url 
     * @param {HttpRequestOptions} options 
     * @returns {Promise<{text: Function, json: Function}>} */
    async delete(path, body, options = {}) {
        const url = StillHTTPClient.getURL(path);
        //return await this.get(url, { ...options, method: 'DELETE' })
        const { headers } = options;
        try {            
            const response = (await fetch(url, {
                method: 'DELETE',
                body,
                headers: headers || {},
            }));
            return response;
        } catch (error) {
            return error;
        }
    }

    /**
     * @param {string} url 
     * @param {string|JSON|object} body 
     * @param {HttpRequestOptions} options 
     * @returns {Promise<{text: Function, json: Function}>} */
    async post(path, body, options = {}) {
        const url = StillHTTPClient.getURL(path);
        const { headers, method } = options;
        try {            
            const response = (await fetch(url, {
                method: method || 'POST',
                body,
                headers: headers || {},
            }));
            return response;
        } catch (error) {
            return error
        }
    }

    /**
     * @param {string} url 
     * @param {string|JSON|object} body 
     * @param {HttpRequestOptions} options 
     * @returns {Promise<{text: Function, json: Function}>} */
    async put(path, body, options = {}) {
        return await this.post(path, body, { ...options, method: 'PUT' });
        // url duplicated
        //return await this.post(url, body, { ...options, method: 'PUT' });
    }

    /**
     * @param {string} url 
     * @param {string|JSON|object} body 
     * @param {HttpRequestOptions} options 
     * @returns {Promise<{text: Function, json: Function}>} */
    async patch(path, body, options = {}) {
        return await this.post(path, body, { ...options, method: 'PATCH' });
    }

}