// Copyright 2002-2014, University of Colorado Boulder

/**
 * Multiplication table product button node.
 *
 * @author Andrey Zelenkov (MLearner)
 */

define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MultiplicationTableButtonAbstract = require( 'ARITHMETIC/common/view/table/MultiplicationTableButtonAbstract' );

  // images
  var pointingHandImage = require( 'image!ARITHMETIC/pointing-hand.png' );

  // constants
  var CONSTANTS = require( 'ARITHMETIC/common/ArithmeticConstants' ).MULTIPLICATION_TABLE.PRODUCT_BUTTON;

  /**
   * @param contentText {Text} text label for button
   * @param backgroundOptions {Object} background options for button
   * @param textOptions {Object} text options for button
   *
   * @constructor
   */
  function MultiplicationTableButtonProductNode( contentText, backgroundOptions, textOptions ) {
    backgroundOptions = _.extend( {
      fill: CONSTANTS.NORMAL_COLOR
    }, backgroundOptions );
    MultiplicationTableButtonAbstract.call( this, backgroundOptions, textOptions );

    // create pointer for active state
    this._pointer = new Image( pointingHandImage, {visible: false} );

    // set position and size for pointer
    this._pointer.scale( backgroundOptions.width / this._pointer.getWidth() * 0.75, backgroundOptions.height / this._pointer.getHeight() * 0.75 );
    this._pointer.centerX = backgroundOptions.width / 2;
    this._pointer.centerY = backgroundOptions.height / 2;

    // add pointer to node
    this.addChild( this._pointer );

    this.setText( contentText );
    this.hideText();
  }

  return inherit( MultiplicationTableButtonAbstract, MultiplicationTableButtonProductNode, {
    active: function() {
      this.setBackgroundFill( CONSTANTS.ACTIVE_COLOR );
      this._pointer.visible = false;
    },
    hover: function() {
      this.setBackgroundFill( CONSTANTS.HOVER_COLOR );
      this._pointer.visible = true;
    },
    normal: function() {
      this.setBackgroundFill( CONSTANTS.NORMAL_COLOR );
      this._pointer.visible = false;
    },
    select: function() {
      this.setBackgroundFill( CONSTANTS.SELECT_COLOR );
      this._pointer.visible = false;
    }
  } );
} );
