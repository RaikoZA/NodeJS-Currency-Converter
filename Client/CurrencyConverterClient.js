const ApiRequester = require('./ApiRequest');

class CurrencyConverterClient {

    constructor(from, to){
        this.from = from;
        this.to = to;
        this.currencyValues = `${this.from}_${this.to}`;
    }

    requestConversion() {

        /**
         * Rounds off currency output 2 decimal places
         *
         * @param value is the result returned from ApiRequester
         */
        const roundOff = value => (Math.round(value * 100) / 100).toFixed(2);

        const apiUrl = `http://free.currencyconverterapi.com/api/v3/convert?q=${this.currencyValues}`;
        const sendApiRequest = new ApiRequester(apiUrl);

        const jsonParse = data => {
            const value = JSON.parse(data)["results"][this.currencyValues.toUpperCase()];

            if (typeof value !== 'undefined') return value["val"];
            else return `Not a valid currency value: ${value}`
        };

        /**
         * SendApiRequest sends a request to the apiUrl via the
         * ApiRequester class and retrieves JSON which is then parsed for final
         * currency value
         */
        return sendApiRequest.send()
            .then((result) => {
                const response = jsonParse(result);
                if(isNaN(response)) return 'Could not return currency, check your currency values!';
                else return roundOff(response)
            });
    }
}

module.exports = CurrencyConverterClient;