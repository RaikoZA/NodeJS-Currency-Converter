const CurrencyConverter = require('./Client/CurrencyConverterClient');

/**
 * Converts two parameters from param to param1 eg: USD to ZAR
 *
 * @param from string selects the currency you would like to convert
 * @param to string converts from => to new currency user is requesting
 * @param ApiRequester Instantiates ApiRequest class with the currency values
 */
const currencyConverter = new CurrencyConverter('usd', 'zar');

/**
 * ApiRequester requestConversion returns a promise with the currency results
 */
currencyConverter.requestConversion()
    .then(console.log)
    .catch(console.error);
