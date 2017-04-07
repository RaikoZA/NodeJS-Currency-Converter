'use strict';

const request = require('request');
const cheerio = require('cheerio');

/**
 * Rounds off currency output 2 decimal places
 * @param currency is the result returned from sendRequest
 */
const roundOff = currency => (Math.round(currency * 100) / 100).toFixed(2);

/**
 * Sends request to currency url with user params
 * @url string returns the function getCurrency url
 */
const sendRequest = url => new Promise((resolve, reject) => {
    request({ url: url }, (error, response, body) => {
        if (error) {
            reject(`Error: ${error}`);
        } else {
            const $ = cheerio.load(body);
            const currency = $('div.tmc-well.switch-table > p > b').text();
            resolve(currency);
        }
    })
});

/**
 * Converts two parameters from param to param1 eg: USD to ZAR
 * @param fromCurrency selects the currency you would like to convert
 * @param toCurrency converts fromCurrency to new currency user is requesting
 */
exports.getCurrency = (fromCurrency, toCurrency) => {
    const url = `http://themoneyconverter.com/${fromCurrency}/${toCurrency}.aspx`;

    return sendRequest(url)
        .then(roundOff)
};
