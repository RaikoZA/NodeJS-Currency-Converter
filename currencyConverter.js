var request = require('request');
var cheerio = require('cheerio');

/**
* Rounds off currency output 2 decimal places
* @param currency is the result returned from sendRequest
*/
var roundOff = function (currency) {
  var result = Math.round(currency * 100) / 100;
  
  return result.toFixed(2);
}

/**
* Converts two parameters from param to param1 eg: USD to ZAR
* @param fromCurrency selects the currency you would like to convert
* @param toCurrency converts fromCurrency to new currency user is requesting
*/
var getCurrency = function (fromCurrency, toCurrency, callback) {
  var url = 'http://themoneyconverter.com/'+fromCurrency+'/'+toCurrency+'.aspx'

  return sendRequest(url, callback);
};

/**
* Sends request to currency url with user params
* @currencyUrl string returns the function getCurrency url
*/
var sendRequest = function (currencyUrl, callback) {
  request({ url: currencyUrl }, function (err, response, body) {
    if (err) {
      callback(err);
    }
    var $ = cheerio.load(body);
    var currency = $('div.tmc-well.switch-table > p > b').text();
    
    callback(null, roundOff(currency));
  });
}

getCurrency('usd', 'zar', function (error, result) {
  if (error) {
    console.log('Error:' + error);
  }else {
    console.log('Converted:' + result);
  }
});
