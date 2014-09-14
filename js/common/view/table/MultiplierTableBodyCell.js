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
  var AbstractCell = require( 'ARITHMETIC/common/view/table/AbstractCell' );

  // images
  var pointingHandImage = require( 'image!ARITHMETIC/pointing-hand.png' );

  // constants
  var ACTIVE_COLOR = 'rgb(3,18,136)'; // active color
  var HOVER_COLOR = 'rgb(238,253,77)'; // hover color
  var NORMAL_COLOR = 'rgb(50,70,255)'; // normal color
  var SELECT_COLOR = 'rgb(77,0,153)'; // select color

  /**
   * @param {Text} contentText - Text label for button.
   * @param {Object} backgroundOptions - Background options for button.
   * @param {Object} textOptions - Text options for button.
   *
   * @constructor
   */
  function MultiplierTableBodyCell( contentText, backgroundOptions, textOptions ) {
    backgroundOptions = _.extend( {
      fill: NORMAL_COLOR
    }, backgroundOptions );
    AbstractCell.call( this, backgroundOptions, textOptions );

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

  return inherit( AbstractCell, MultiplierTableBodyCell, {
    active: function() {
      this.setBackgroundFill( ACTIVE_COLOR );
      this._pointer.visible = false;
    },
    hover: function() {
      this.setBackgroundFill( HOVER_COLOR );
      this._pointer.visible = true;
    },
    normal: function() {
      this.setBackgroundFill( NORMAL_COLOR );
      this._pointer.visible = false;
    },
    select: function() {
      this.setBackgroundFill( SELECT_COLOR );
      this._pointer.visible = false;
    }
  } );
} );
