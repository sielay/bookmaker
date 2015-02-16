'use strict';

/**
 * Module dependencies.
 */
var should = require( 'should' ),
Odds       = require( './index' ),
chalk      = require( 'chalk' );

/**
 * Unit tests
 */
describe( 'Conversion function', function () {

    var tests = [
        [ 1, 1, 2, 100, 0.5 ],
        [ 4, 1, 5, 400, 0.2 ],
        [ 1, 2, 1.5, -200, 0.67 ],
        [ 1, 4, 1.25, -400, 0.8 ]
    ];

    tests.forEach( function ( test ) {

        var numerator = test[ 0 ];
        var denominator = test[ 1 ];
        var decimal = test[ 2 ];
        var american = test[ 3 ];
        var percent = test[ 4 ];

        it( 'Convert fraction ' + numerator + '/' + denominator + ' to ' + (percent * 100) + '%', function () {
            Odds.fractionToPercent( numerator, denominator ).should.eql( percent );
        } );

        it( 'Convert fraction ' + numerator + '/' + denominator + ' to decimal ' + decimal, function () {
            Odds.fractionToDecimal( numerator, denominator ).should.eql( decimal );
        } );

        it( 'Convert fraction ' + numerator + '/' + denominator + ' to GBP ' + american, function () {
            Odds.fractionToAmerican( numerator, denominator ).should.eql( american );
        } );

        it( 'Convert decimal ' + decimal + ' to fraction ' + numerator + '/' + denominator, function () {
            Odds.decimalToFraction( decimal ).should.eql( numerator + '/' + denominator );
        } );

        it( 'Convert decimal ' + decimal + ' to percent ' + (percent * 100) + '%', function () {
            Odds.decimalToPercent( decimal ).should.eql( percent );
        } );

        it( 'Convert decimal ' + decimal + ' to american GBP ' + (american), function () {
            Odds.decimalToAmerican( decimal ).should.eql( american );
        } );

        it( 'Convert percent ' + (percent * 100) + '% to fraction ' + numerator + '/' + denominator, function () {
            Odds.percentToFraction( percent ).should.eql( numerator + '/' + denominator );
        } );

        it( 'Convert percent ' + (percent * 100) + '% to ' + decimal, function () {
            Odds.percentToDecimal( percent ).should.approximately( decimal, 0.02 );
        } );

        it( 'Convert percent ' + (percent * 100) + '% to american GBP ' + american, function () {
            Odds.percentToAmerican( percent ).should.approximately( american, 5 );
        } );

        it( 'Convert american GBP ' + american + '% to decimal ' + decimal, function () {
            Odds.americanToDecimal( american ).should.eql( decimal );
        } );

        it( 'Convert american GBP ' + american + '% to fraction ' + numerator + '/' + denominator, function () {
            Odds.americanToFraction( american ).should.eql( numerator + '/' + denominator );
        } );

        it( 'Convert american GBP ' + american + '% to percent ' + (percent * 100) + '%', function () {
            Odds.americanToPercent( american ).should.eql( percent );
        } );

        it( 'Parse string "' + numerator + '/' + denominator + '" to decimal ' + decimal, function () {
            Odds.parse( numerator + '/' + denominator ).should.eql( decimal );
        } );

        it( 'Parse string "' + decimal + '" to decimal ' + decimal, function () {
            Odds.parse( '' + decimal ).should.eql( decimal );
        } );

        it( 'Parse string "' + (decimal * 100) + ':100" to decimal ' + decimal, function () {
            Odds.parse( (decimal * 100) + ':100' ).should.eql( decimal );
        } );

        it( 'Parse string ' + (percent * 100) + '% to decimal ' + decimal, function () {
            Odds.parse( (percent * 100) + '%' ).should.approximately( decimal, 0.02 );
        } );

    } );
} );

describe( 'Operations', function () {

    it( 'WinSingle', function () {
        Odds.winSingle( Odds.fractionToDecimal( 9, 2 ), 100 ).should.eql( 550 );
        Odds.winSingle( '9/2', 100 ).should.eql( 550 );
    } );

    it('OddsEachWAy', function() {
        var odds = Odds.oddsEachWaySingle('11/4',0.2 );
        odds.oddsWin.should.eql(3.75);
        odds.oddsPlace.should.eql(1.55);

        var odds = Odds.oddsEachWaySingle('11/4','1:5' );
        odds.oddsWin.should.eql(3.75);
        odds.oddsPlace.should.eql(1.55);
    });

    it( 'WinEachWaySingle', function () {
        Odds.winEachWaySingle(
            '11/4',
            0.2,
            100,
            100
        ).should.eql( 530 );
    } );

    it('CombinedOddsEachWay', function() {
        var odds = Odds.combinedOddsEachWay([[ '1/1', '1:4' ], [ '11/8', '1:5' ], [ '5/4', '1:4' ], [ '1/2', '1' ], [ '3/1', '1:5' ]] );
        odds.win.should.approximately(64.25,0.02);
        odds.place.should.approximately(5.024,0.02);
    });

    it('CombineOdds', function() {
        Odds.combineOdds(['1/1','11/8','5/4','1/2','3/1']).should.approximately(64.25,0.02);
    });

    it( 'WinAccumulator', function () {
        Odds.winAccumulator( 100, 100, [ '1/1', '1:4' ], [ '11/8', '1:5' ], [ '5/4', '1:4' ], [ '1/2', '1' ], [ '3/1', '1:5' ] ).should.eql( 6928.42 )

    } );
} );



