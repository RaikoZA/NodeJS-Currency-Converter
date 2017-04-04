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
 * @currencyUrl string returns the function getCurrency url
*/
const sendRequest = (currencyUrl, callback) => {
  request({ url: currencyUrl }, function (error, response, body) {
    if(error) {
      callback('There was an error retrieving url');
    }

    let $ = cheerio.load(body);
    let currency = $('div.tmc-well.switch-table > p > b').text();
    
    callback(null, roundOff(currency));
  });
};

/**
 * Converts two parameters from param to param1 eg: USD to ZAR
 * @param fromCurrency selects the currency you would like to convert
 * @param toCurrency converts fromCurrency to new currency user is requesting
 * @param callback to handle errors and results
 */
exports.getCurrency = (fromCurrency, toCurrency, callback) => {
    let url = `http://themoneyconverter.com/${fromCurrency}/${toCurrency}.aspx`;

    sendRequest(url, callback);
};
