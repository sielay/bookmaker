(function ( root, factory ) {
    if ( typeof define === 'function' && define.amd ) {
        define( function () {
            return factory();
        } );
    } else if ( typeof exports === 'object' ) {
        module.exports = factory();
    } else {
        root.oddsLib = factory();
    }
})( this, function () {

    'use strict';

    var Odds = {};

    Odds.fractionToPercent = fractionToPercent;
    Odds.fractionToDecimal = fractionToDecimal;
    Odds.fractionToAmerican = fractionToAmerican;

    Odds.decimalToFraction = decimalToFraction;
    Odds.decimalToPercent = decimalToPercent;
    Odds.decimalToAmerican = decimalToAmerican;

    Odds.percentToDecimal = percentToDecimal;
    Odds.percentToFraction = percentToFraction;
    Odds.percentToAmerican = percentToAmerican;

    Odds.americanToDecimal = americanToDecimal;
    Odds.americanToPercent = americanToPercent;
    Odds.americanToFraction = americanToFraction;

    Odds.winSingle = winSingle;
    Odds.winEachWaySingle = winEachWaySingle;
    Odds.winEachWaySingleDetailed = winEachWaySingleDetailed;
    Odds.winAccumulator = winAccumulator;
    Odds.parse = parse;

    function americanToPercent(american) {
        return +(1 / _americanToDecimal(american)).toFixed(2);
    }

    function fractionToAmerican ( a, m ) {
        return decimalToAmerican( fractionToDecimal( a, m ) );
    }

    function americanToFraction ( money ) {
        return decimalToFraction( americanToDecimal( money ) );
    }

    function percentToAmerican(percent) {
        return decimalToAmerican(+(1/percent));
    }

    function _fractionToPercent(howMany, inHowMany) {
        return (inHowMany) / (howMany + inHowMany);
    }

    function fractionToPercent ( howMany, inHowMany ) {
        return +(_fractionToPercent(howMany, inHowMany)).toFixed(2);
    }

    function fractionToDecimal ( howMany, inHowMany ) {
        return +(100 / (_fractionToPercent(howMany, inHowMany) * 100 )).toFixed( 2 );
    }

    function _americanToDecimal ( moneyline ) {
        if ( moneyline >= 0 ) {
            return ((moneyline / 100) + 1);
        }
        return ((100 / -moneyline) + 1);
    }

    function americanToDecimal ( moneyline ) {
        return +_americanToDecimal(moneyline ).toFixed(2);
    }

    function decimalToAmerican ( decimal ) {
        if(decimal >= 2) {
            return (decimal - 1) * 100;
        }
        return (-100) / (decimal -1);
    }

    function _formatFraction(y, d) {
        if ( y < 1 && y > 0 ) {
            d = 1 / y;
            y = 1;
        }
        if ( y < 0 ) {
            d = -y;
            y = 1;
        }
        return [y,d];
    }

    function decimalToFraction ( x ) {
        var d = 1, y = x - 1;
        var v = _formatFraction(y,d);
        return v[0] + '/' + v[1];
    }

    function decimalToPercent ( x ) {
        return +(1 / x).toFixed(2);
    }

    function percentToDecimal ( x ) {
        return +(1/x).toFixed(2);
    }

    function percentToFraction ( x, d ) {
        var y = calculatePercentToFraction( x, d );
        var v = _formatFraction(y[0],y[1]);
        return v[ 0 ] + '/' + Math.round(v[ 1 ]);
    }

    function calculatePercentToFraction ( x, d ) {
        if ( !(d > 0) ) {
            d = 1;
        }
        var y = (d - (d * x)) / x;
        return [ y, d ];

    }

    function winSingle ( odds, money ) {
        return Math.round( money * parse( odds ) );
    }

    function winEachWaySingle ( oddsWin, oddsPlace, moneyWin, moneyPlace ) {
        var details = winEachWaySingleDetailed( oddsWin, oddsPlace, moneyWin, moneyPlace );
        return +(details.win + details.place).toFixed( 2 );
    }

    function oddsEachWaySingle ( oddsWin, oddsPlace ) {
        var odds = parse( oddsWin );
        var oddsFranctionised = odds - 1;
        var oddsPlace = (oddsFranctionised * oddsPlace) + 1;
        return {
            oddsWin   : odds,
            oddsPlace : oddsPlace
        };
    }

    function winEachWaySingleDetailed ( oddsWin, oddsPlace, moneyWin, moneyPlace ) {
        var details = oddsEachWaySingle( oddsWin, oddsPlace );
        details.win = winSingle( details.oddsWin, moneyWin );
        details.place = winSingle( details.oddsPlace, moneyPlace );
        return details;
    }

    function combinedOddsEachWay ( list ) {
        var win = 1;
        var place = 1;
        list.forEach( function ( pair ) {
            var odds = parse( pair[ 0 ] );
            var placeOddsFactor = parse( pair[ 1 ] );
            var placeOdds = ((odds - 1) * placeOddsFactor) + 1;
            win *= odds;
            place *= placeOdds;
        } );
        return {
            win   : win,
            place : place
        };
    }

    function winAccumulator () {
        var args = Array.prototype.slice.call( arguments );
        var moneyWin = args.shift();
        var moneyPlace = args.shift();
        var odds = combinedOddsEachWay( args );
        var win = odds.win * moneyWin;
        var place = odds.place * moneyPlace;
        return +(win + place).toFixed( 2 );
    }

    /**
     *
     * @param {String|Number} string
     * @returns {Number} decimal odds
     * @throws Exception on invalid string
     */

    function parse ( string ) {



        if ( typeof string !== 'string' && !isNaN( string ) ) {
            return string;
        }

        var parts = string.split( '/' );
        if ( parts.length === 2 ) {
            var howMany = parseInt( parts[ 0 ] );
            var inHowMany = parseInt( parts[ 1 ] );
            if ( isNaN( howMany ) || isNaN( inHowMany ) ) {
                throw new Error( 'Invalid odds string `' + string + '`' );
            }
            return fractionToDecimal( howMany, inHowMany );
        }
        var parts = string.split( ':' );
        if ( parts.length === 2 ) {
            var top = parseInt( parts[ 0 ] );
            var bottom = parseInt( parts[ 1 ] );
            if ( isNaN( top ) || isNaN( bottom ) ) {
                throw new Error( 'Invalid odds string `' + string + '`' );
            }
            return top / bottom;
        }
        if ( parts.length === 1 ) {
            if(/\d+(|\.\d+)%/.test(string)) {
                var p = parseFloat(string.replace('%',''));
                return percentToDecimal(p/100);
            }
            var odds = parseFloat( string );
            if ( isNaN( odds ) ) {
                throw new Error( 'Invalid odds string `' + string + '`' );
            }
            return odds;
        }
        throw new Error( 'Invalid odds string `' + string + '`' );
    }

    return Odds;

} );
