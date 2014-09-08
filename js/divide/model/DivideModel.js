// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model for divide game in the 'Arithmetic' simulation.
 *
 * @author Andrey Zelenkov (MLearner)
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ArithmeticModel = require( 'ARITHMETIC/common/model/ArithmeticModel' );

  // constants
  var GAME_STATE = require( 'ARITHMETIC/common/GameState' );

  /**
   * @constructor
   */
  function DivideModel() {
    var self = this;
    ArithmeticModel.call( this, {
      fillEquation: function() {
        // Convert any strings entered by the user into numerical values.
        self.gameModel.multiplierRight = parseInt( self.gameModel.multiplierRight, 10 );
        self.gameModel.multiplierLeft = parseInt( self.gameModel.multiplierLeft, 10 );

        // Advance to the next game state.
        self.gameModel.state = GAME_STATE.EQUATION_FILLED;
      }
    } );

    // point to multiplierLeft or multiplierRight
    this.addProperty( 'linkToActiveInput', null );

    // next task observer
    this.gameModel.property( 'state' ).link( function( state ) {
      if ( state === GAME_STATE.NEXT_TASK ) {
        // get available multipliers
        var multipliers = self.gameModel.getAvailableMultipliers();

        if ( multipliers ) {
          // reset multipliers and score properties
          self.input = '';
          self.gameModel.property( 'multiplierLeft' ).reset();
          self.gameModel.property( 'multiplierRight' ).reset();
          self.gameModel.property( 'product' ).reset();
          self.gameModel.property( 'possiblePoints' ).reset();

          // set product
          self.gameModel.product = multipliers.multiplierLeft * multipliers.multiplierRight;

          // set left or right multiplier
          if ( Math.random() < 0.5 ) {
            self.gameModel.multiplierLeft = multipliers.multiplierLeft;
            self.linkToActiveInput = self.gameModel.property( 'multiplierRight' );
          }
          else {
            self.gameModel.multiplierRight = multipliers.multiplierRight;
            self.linkToActiveInput = self.gameModel.property( 'multiplierLeft' );
          }

          // set start state
          self.gameModel.state = GAME_STATE.AWAITING_USER_INPUT;
        }
        else {
          // set level finished state
          self.gameModel.state = GAME_STATE.LEVEL_FINISHED;
        }
      }
    } );
  }

  return inherit( ArithmeticModel, DivideModel );
} );
