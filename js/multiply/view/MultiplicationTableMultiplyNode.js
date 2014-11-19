// Copyright 2002-2014, University of Colorado Boulder

/**
 * Multiplication table node for the 'Multiply' screen in the 'Arithmetic' simulation.
 *
 * @author Andrey Zelenkov (MLearner)
 */

define( function( require ) {
  'use strict';

  // modules
  var GameState = require( 'ARITHMETIC/common/GameState' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MultiplicationTableNode = require( 'ARITHMETIC/common/view/table/MultiplicationTableNode' );

  /**
   * @param {GameModel} gameModel - Model for single task.
   * @param {Property} levelProperty - Level difficulty property.
   * @param {Property} stateProperty - Current state property.
   * @param {Array} levelModels - Array of descriptions for each level.
   *
   * @constructor
   */
  function MultiplicationTableMultiplyNode( gameModel, stateProperty, levelProperty, levelModels ) {
    var self = this;
    MultiplicationTableNode.call( this, levelProperty, stateProperty, levelModels, gameModel );

    // Turn on delayed text so that the animation of the answer to the cell looks correct.
    this.setDelayedText( true );

    stateProperty.lazyLink( function( state ) {
      // set view for multiplication table after choosing left and right multipliers
      if ( state === GameState.NEXT_TASK ) {

        // clear cells before game
        self.clearCells( levelProperty.value );

        // set view of selected multipliers
        self.cells[levelProperty.value][0][gameModel.multiplierRight].select();
        self.cells[levelProperty.value][gameModel.multiplierLeft][0].select();

        // set view of selected products
        self.cells[levelProperty.value].forEach( function( multiplierLeft, index ) {
          if ( index && index <= gameModel.multiplierLeft ) {
            multiplierLeft.forEach( function( cell, index ) {
              if ( index && index <= gameModel.multiplierRight ) {
                cell.select();
              }
            } );
          }
        } );
      }
    } );
  }

  return inherit( MultiplicationTableNode, MultiplicationTableMultiplyNode );
} );
