export default class HttpClient {
    constructor(baseUrl = '', csrfToken = '') {
        this.baseUrl = baseUrl;
        this.csrfToken = csrfToken;
    }

    request(url, method = 'GET', parameters = {}, headers = {}, callBack) {
        const fullUrl = this.baseUrl + url;
        if (method !== 'GET') {
            headers['X-CSRF-Token'] = this.csrfToken;
        }
        const options = {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...headers
            }
        }
        if (method === 'GET' && Object.entries(parameters).length > 0) {
            const queryString = new URLSearchParams(parameters).toString();
            fullUrl = fullUrl + '?' + queryString;
        } else if (method !== 'GET') {
            options.body = JSON.stringify(parameters);
        }
        fetch(fullUrl, options)
            .then(response => {
                return response.json();
            })
            .then(data => {
                callBack(data);
            })
            .catch(error => {
                console.log(url, method, error);
            })
    }

    delete(url, parameters = {}, callBack) {
        this.request(url, 'DELETE', parameters, {}, callBack);
    }

    update(url, parameters = {}, callBack) {
        this.request(url, 'PATCH', parameters, {}, callBack);
    }

    get(url, parameters = {}, callBack) {
        this.request(url, 'GET', parameters, {}, callBack);
    }

    post(url, parameters = {}, callBack) {
        this.request(url, 'POST', parameters, {}, callBack);
    }

    postFormData(url, formData, callBack) {
        const fullUrl = this.baseUrl + url;
        const options = {
            method: 'POST',
            headers: {
                'X-CSRF-Token': this.csrfToken,
                'Accept': 'application/json'
                // No incluir 'Content-Type' aquí, FormData lo establece automáticamente
            },
            body: formData
        };
        
        fetch(fullUrl, options)
            .then(response => {
                return response.json();
            })
            .then(data => {
                callBack(data);
            })
            .catch(error => {
                console.log(url, 'POST', error);
            });
    }

    put(url, parameters = {}, callBack) {
        this.request(url, 'PUT', parameters, {}, callBack);
    }
    
    putFormData(url, formData, callBack) {
        const fullUrl = this.baseUrl + url;
        formData.append('_method', 'PUT');
        
        const options = {
            method: 'POST',
            headers: {
                'X-CSRF-Token': this.csrfToken,
                'Accept': 'application/json'
            },
            body: formData
        };
        
        fetch(fullUrl, options)
            .then(response => {
                return response.json();
            })
            .then(data => {
                callBack(data);
            })
            .catch(error => {
                console.log(url, 'PUT', error);
            });
    }

    set csrf(csrfToken) {
        this.csrfToken = csrfToken;
    }
}