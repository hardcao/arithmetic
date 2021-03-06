// Copyright 2014-2020, University of Colorado Boulder

/**
 * This node shows the level completed node when the user completes a level.
 *
 * @author Andrey Zelenkov (MLearner)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Color from '../../../../scenery/js/util/Color.js';
import LevelCompletedNode from '../../../../vegas/js/LevelCompletedNode.js';
import arithmetic from '../../arithmetic.js';
import ArithmeticConstants from '../ArithmeticConstants.js';
import GameState from '../model/GameState.js';

/**
 * @param {Array} levelModels - Array of descriptions for each level. Necessary to get perfect and current score for
 * completed level.
 * @param {Property} levelNumberProperty - Level property.
 * @param {Property} stateProperty - Game state property.
 * @param {Property} timerEnabledProperty - Timer enabled flag.
 * @param {Function} continueCallback - Callback listener for continue button.
 * @param {Bounds2} layoutBounds - Bounds of main screen. Necessary for placing components.
 * @constructor
 */
function LevelCompletedNodeWrapper( levelModels, levelNumberProperty, stateProperty, timerEnabledProperty, continueCallback, layoutBounds ) {
  const self = this;
  Node.call( this );

  // Show this node only when the level has been completed.
  stateProperty.lazyLink( function( state ) {
    if ( state === GameState.SHOWING_LEVEL_COMPLETED_DIALOG ) {
      const levelModel = levelModels[ levelNumberProperty.value ];
      self.addChild( new LevelCompletedNode(
        levelNumberProperty.value + 1,
        levelModel.currentScoreProperty.get(),
        levelModel.perfectScore,
        ArithmeticConstants.NUM_STARS,
        timerEnabledProperty.value,
        levelModel.gameTimer.elapsedTimeProperty.value,
        levelModel.bestTimeProperty.get(),
        ( levelModel.gameTimer.elapsedTimeProperty.get() < levelModel.bestTimeProperty.get() ),
        continueCallback,
        { fill: new Color( 255, 235, 205 ), centerX: layoutBounds.maxX / 2, centerY: layoutBounds.maxY / 2 }
      ) );
    }
    else if ( state === GameState.AWAITING_USER_INPUT || state === GameState.LEVEL_COMPLETED ) {
      self.removeAllChildren();
    }
  } );
}

arithmetic.register( 'LevelCompletedNodeWrapper', LevelCompletedNodeWrapper );

inherit( Node, LevelCompletedNodeWrapper );
export default LevelCompletedNodeWrapper;