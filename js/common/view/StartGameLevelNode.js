// Copyright 2002-2014, University of Colorado Boulder

/**
 * Screen that allows the user to select the game level that they wish to play.
 *
 * @author Andrey Zelenkov (MLearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LevelStartButton = require( 'VEGAS/LevelStartButton' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );

  // constants
  var CONSTANTS = require( 'ARITHMETIC/common/ArithmeticConstants' );
  var CHOOSE_LEVEL_TITLE_FONT = new PhetFont( {size: 24} );
  var STAR_NUMBER = CONSTANTS.STAR_NUMBER;
  var TAB_TITLE_FONT = new PhetFont( {size: 54} );

  // strings
  var chooseYourLevelString = require( 'string!ARITHMETIC/chooseYourLevel' );

  /**
   * @param levelDescriptions {Array} array of descriptions for each level.
   * For each level will be created LevelStartButton node
   * @param bestScorePropertyArray {Array} array of score properties.
   * Necessary for representing best scores for each level
   * @param levelProperty {Property} level difficulty property
   * @param titleString {String} title string for given screen
   * @param simBounds {Bounds2} bounds of simulation
   *
   * @constructor
   */
  function StartGameLevelNode( levelDescriptions, bestScorePropertyArray, levelProperty, titleString, simBounds ) {
    var self = this;
    Node.call( this );

    // add title
    var tabTitle = new Text( titleString, {
      font: TAB_TITLE_FONT,
      centerX: simBounds.width / 2,
      centerY: simBounds.height / 4
    } );
    this.addChild( tabTitle );

    // add choose level title
    var chooseLevelTitle = new Text( chooseYourLevelString, {
      font: CHOOSE_LEVEL_TITLE_FONT,
      centerX: simBounds.width / 2,
      centerY: tabTitle.bounds.maxY + 30
    } );
    this.addChild( chooseLevelTitle );

    // add select level buttons
    var selectLevelButtons = new HBox( {spacing: 50} );
    levelDescriptions.forEach( function( level, levelIndex ) {
      selectLevelButtons.addChild( new LevelStartButton(
        new Image( level.icon ),
        STAR_NUMBER,
        function() {
          levelProperty.value = levelIndex + 1;
        },
        bestScorePropertyArray[levelIndex],
        level.perfectScore,
        {
          buttonWidth: 135,
          buttonHeight: 135,
          backgroundColor: 'white',
          highlightedBackgroundColor: 'white'
        }
      ) );
    } );
    selectLevelButtons.updateLayout();
    selectLevelButtons.centerX = simBounds.width / 2;
    selectLevelButtons.top = chooseLevelTitle.bounds.maxY + 20;
    this.addChild( selectLevelButtons );

    levelProperty.link( function( level ) {
      self.visible = !level;
    } );
  }

  return inherit( Node, StartGameLevelNode );
} );
