// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control panel node. Contains refresh button, sound and timer toggle buttons.
 *
 * @author Andrey Zelenkov (MLearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var GameState = require( 'ARITHMETIC/common/GameState' );
  var GameTimer = require( 'VEGAS/GameTimer' );
  var HStrut = require( 'SUN/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RefreshButton = require( 'SCENERY_PHET/RefreshButton' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var pattern_level_0levelNumber = require( 'string!ARITHMETIC/pattern.level.0levelNumber' );
  var scoreString = require( 'string!VEGAS/label.score' );
  var timeString = require( 'string!VEGAS/label.time' );

  // constants
  var BACKGROUND_COLOR = 'rgb( 173, 239, 255 )'; // color of control panel background
  var BACKGROUND_MARGIN = new Dimension2( 20, 40 ); // size of margin from content
  var FONT = new PhetFont( { size: 18 } );
  var FONT_BOLD = new PhetFont( { size: 18, weight: 'bold' } );
  var REFRESH_BUTTON_BASE_COLOR = 'rgb( 255, 204, 67 )';
  var REFRESH_BUTTON_MARGIN = new Dimension2( 20, 10 );
  var SPACING = 18;

  /**
   * @param {Property} levelProperty - Property for level displaying label.
   * @param {Property} stateProperty - State of game property.
   * @param {Array} levelModels - Array of properties for score counter component.
   * @param {Property} timerEnabledProperty - Time enabling flag.
   * @param {Function} refreshLevelCallback - Callback listener for refresh level button.
   *
   * @constructor
   */
  function ControlPanelNode( levelProperty, stateProperty, levelModels, timerEnabledProperty, refreshLevelCallback ) {
    var background = new Rectangle( 0, 0, 0, 0, {fill: BACKGROUND_COLOR, stroke: 'gray'} );
    var levelText = new Text( StringUtils.format( pattern_level_0levelNumber, levelProperty.value.toString() ), FONT_BOLD );
    var scoreText = new Text( StringUtils.format( scoreString, '0' ), FONT );
    var timeText = new Text( StringUtils.format( timeString, GameTimer.formatTime( 0 ) ), FONT );
    var minWidth = Math.max( levelText.getWidth(), scoreText.getWidth(), timeText.getWidth() ) * 1.1;

    Node.call( this );

    // add background
    this.addChild( background );

    // add control buttons
    var vBox = new VBox( {
      spacing: SPACING, children: [
        levelText,
        scoreText,
        timeText,
        // add refresh button
        new RefreshButton( {
          baseColor: REFRESH_BUTTON_BASE_COLOR,
          xMargin: REFRESH_BUTTON_MARGIN.width,
          yMargin: REFRESH_BUTTON_MARGIN.height,
          listener: refreshLevelCallback
        } ).mutate( {scale: 0.75} ),
        new HStrut( minWidth )
      ]} );
    this.addChild( vBox );

    // add observers
    var updateScore = function( score ) {
      scoreText.setText( StringUtils.format( scoreString, score.toString() ) );
      updateBackgroundSize( background, vBox );
    };

    var updateTime = function( time ) {
      timeText.setText( StringUtils.format( timeString, GameTimer.formatTime( time ) ) );
      updateBackgroundSize( background, vBox );
    };

    levelProperty.lazyLink( function( level ) {
      levelText.setText( StringUtils.format( pattern_level_0levelNumber, (level + 1).toString() ) );

      levelModels.forEach( function( levelModel ) {
        levelModel.property( 'currentScore' ).unlink( updateScore );
        levelModel.gameTimer.property( 'elapsedTime' ).unlink( updateTime );
      } );

      if ( stateProperty.value === GameState.LEVEL_SELECT && levelModels[level] ) {
        levelModels[level].property( 'currentScore' ).link( updateScore );
        levelModels[level].gameTimer.property( 'elapsedTime' ).link( updateTime );
      }
    } );

    // add/remove timeBox and update background size
    timerEnabledProperty.link( function( isTimerEnabled ) {
      if ( isTimerEnabled ) {
        vBox.insertChild( 2, timeText ); // 2 - index of initial place for timeBox
      }
      else {
        vBox.removeChild( timeText );
      }

      updateBackgroundSize( background, vBox );
    } );
  }

  // set background size
  var updateBackgroundSize = function( backgroundNode, controlPanelNode ) {
    controlPanelNode.centerX = controlPanelNode.width / 2;
    backgroundNode.setRect( -BACKGROUND_MARGIN.width / 2, -BACKGROUND_MARGIN.height / 2, controlPanelNode.bounds.width + BACKGROUND_MARGIN.width,
        controlPanelNode.bounds.height + BACKGROUND_MARGIN.height - SPACING, 5, 5 );
  };

  return inherit( Node, ControlPanelNode );
} );
