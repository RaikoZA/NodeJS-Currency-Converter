# NodeJS-Currency-Converter

This is a currency to currency module created in NodeJS. It's purpose is to take one currency format and convert it to another currency and return the result.

### Prerequisites

* npm install

### Usage:

You need to call getCurrency, it takes two arguments being the two currencies. 
The first argument will be the currency you want to convert and the second argument will be what you want to convert too.
Supply your callback and handle the results

### Example:
```
getCurrency('usd', 'eur', function (error, result) {
  if (error){
    console.log('Error:' + error);
  }else {
    console.log('Converted:' + result);
  } 
});
```
