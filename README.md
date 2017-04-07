# NodeJS-Currency-Converter

This is a currency to currency module created in NodeJS. It's purpose is to take one currency format and convert it to another currency and returns the live result.

## Prerequisites

* npm i rt-currency-converter

## Usage:

After installing module, you need to call getCurrency, it takes two arguments being the two currencies. 
The first argument will be the currency you want to convert and the second argument will be what you want to convert to.

## Example:

#####Returning the promise result:
```

const currency = require('rt-currency-converter');
  
currency.getCurrency('usd', 'eur')
    .then((result) => { console.log(result) }) //Outputs live currency for USD/EUR
    .catch((error) => { console.log(error) });

```
