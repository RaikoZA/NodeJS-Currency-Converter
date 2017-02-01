var request = require('request');
var cheerio = require('cheerio');

/**
* Rounds off currency output 2 decimal places
*/

var roundOff = function (currency) {

  return Math.round(currency * 100) / 100;

}

/**
* Converts two parameters from param to param1 eg: USD to ZAR
* @param fromCurrency selects the currency you would like to convert
* @param toCurrency converts fromCurrency to new currency user is requesting
*/

var getCurrency = function (fromCurrency, toCurrency) {

  var url = 'http://themoneyconverter.com/'+fromCurrency+'/'+toCurrency+'.aspx'

  return sendRequest(url);	

}

/**
* Sends request to currency url with user params
* @currencyUrl string returns the function getCurrency url
*/

var sendRequest = function (currencyUrl) {

  request({ url: currencyUrl }, function (err, response, body) {
    if (err) {
      console.log('Error: ', err);
    }

    var $ = cheerio.load(body);
    var currency = $('div.tmc-well.switch-table > p > b').text();
	  
    console.log(roundOff(currency));

    })
}

var returnResult = function (fromCurrency, toCurrency) {

  getCurrency(fromCurrency, toCurrency, function (err, result) {
    if (err) {
      console.log('Error:', err)
    }else {
      return result;
    }
  })
}
