const request = require('request');

class ApiRequest {

    constructor(apiUrl) {
        this.url = apiUrl;
    }

    send() {
        return new Promise((resolve, reject) => {
            request({ url: this.url}, (err, res, body) => {
                if(err) {
                    reject(`Error: ${err}`);
                    reject(`Response: ${res.statusCode}`)
                } else {
                    resolve(body);
                }
            })
        })
    }
}

module.exports = ApiRequest;
