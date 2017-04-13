'use strict';

const ApiRequest = require('./Client/ApiRequest');

/**
 * Rounds off currency output 2 decimal places
 * @param currency is the result returned from sendApiRequest
 */
const roundOff = currency => (Math.round(currency * 100) / 100).toFixed(2);

/**
 * Converts two parameters from param to param1 eg: USD to ZAR
 * @param from string selects the currency you would like to convert
 * @param to string converts from => to new currency user is requesting
 */
exports.getCurrencyValue = (from, to) => {

    const currencyValues = `${from}_${to}`;
    const apiUrl = `http://free.currencyconverterapi.com/api/v3/convert?q=${currencyValues}`;
    const sendApiRequest = new ApiRequest(apiUrl);

    const jsonParse = data => {
        const value = JSON.parse(data)["results"][currencyValues.toUpperCase()];

        if (typeof value !== 'undefined') return value["val"];
        else return `Not a valid currency value: ${value}`
    };

    /**
     * SendApiRequest sends a request to the apiUrl via the
     * ApiRequest class and retrieves JSON which is then parsed for final
     * currency value
     */

    return sendApiRequest.send()
        .then((result) => {
            const response = jsonParse(result);
            if(isNaN(response)) return 'Could not return currency, check your currency values!';
            else return roundOff(response)
        })
};
