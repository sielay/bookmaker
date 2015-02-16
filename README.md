# Bookmaker

This lib is meant to help you work with odds, for instance in gambling project.

To install use bower or npm

```
bower install bookmaker --save
```

```
npm install bookmakerjs --save
```

You have at the moment series of methods and you can view their use in `test.js`.

Run test:

```
mocha node_modules/bookmaker/test.js
```

## API

### fractionToPercent
fractionToPercent(numerator:Number, denomiator:Number) : Number

Return percent as fraction of 1.
### fractionToDecimal
fractionToDecimal(numerator:Number, denomiator:Number) : Number

### fractionToAmerican
fractionToAmerican(numerator:Number, denomiator:Number) : Number

### decimalToFraction
decimalToFraction(decimal:Number): String

### decimalToPercent
decimalToPercent(decimal:Number): Number

### decimalToAmerican
decimalToAmerican(decimal:Number): Number

### percentToDecimal
percentToDecimal(percent:Number): Number

### percentToFraction
percentToFraction(percent:Number): String

### percentToAmerican
percentToAmerican(percent:Number): Number

### americanToDecimal
americanToDecimal(american:Number): Number

### americanToPercent
americanToPercent(american:Number): Number

### americanToFraction
americanToFraction(american:Number): String

### winSingle
winSingle(decimal:Number, money:Number): Number
winSingle(any:String, money:Number): Number - see parse function

### winEachWaySingle
winEachWaySingle(decimal:Number, placeOdds:Number, moneyWin:Number, moneyPlace:Number): Number
winEachWaySingle(any:String, placeOdds:Number, moneyWin:Number, moneyPlace:Number): Number

### winEachWaySingleDetailed
See `test.js`

### winAccumulator
winEachWaySingle(moneyWin:Number, moneyPlace:Number, [decimal:Number, placeOdds:Number], ...): 
Number

### oddsEachWaySingle
oddsEachWaySingle(winOdds:Any, placeOdds:Any):Object - see `test.js`

### combineOddsEachWay
combineOddsEachWAy(list:Array): Object - see `test.js`

### combineOdds
combineOdds(list:array): Number - see `test.js`


### parse
parse(any:String) : Number - decimal

Accepts:

 * `1/4` fracitons
 * `50%` percents
 * `1:5` odds (: mean divide sign)
 * numbers as decimals
 

## Author

[Lukasz Sielski](http://github.com/sielay)

## Licence

MIT - just because 

