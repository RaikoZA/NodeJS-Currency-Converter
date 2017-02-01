var request = require('request');
var cheerio = require('cheerio');

var roundOff = function(currency){

	/**
	* Rounds off currency output 2 decimal places
	*/

	return Math.round(currency * 100) / 100;

}

var getCurrency = function(param, param1){

	/**
	* Converts two parameters from param to param1 eg: USD to ZAR
	* @param string selects the currency you would like to convert
	* @param2 string converts the first param to new currency user is requesting
	*
	*/

	var url = 'http://themoneyconverter.com/'+param+'/'+param1+'.aspx'

	return sendRequest(url);	

}

var sendRequest = function(currencyUrl){

	/**
	* Sends request to currency url with user params
	* @currencyUrl string returns the function getCurrency url
	*/

	request(
		{
			url: currencyUrl
		}, 

		function(err, response, body){
			if(err){
				console.log('Error: ', err);
			}

			var $ = cheerio.load(body);
			var currency = $('div.tmc-well.switch-table > p > b').text();

			console.log(roundOff(currency));

		})
}

var returnResult = function(param, param1){

	getCurrency(param, param1, function(err, result){
		if(err){
			console.log('Error:', err)
		}else{
			return result;
		}
	})
}


//returnResult('usd', 'zar');