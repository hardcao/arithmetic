// Copyright 2014-2020, University of Colorado Boulder

/**
 * Model for single problem in the 'Arithmetic' simulation. This model contains properties necessary for each challenge
 * at the current level.  This works well as a component that can be passed to the various view elements.
 *
 * @author Andrey Zelenkov (MLearner)
 */

import Property from '../../../../axon/js/Property.js';
import inherit from '../../../../phet-core/js/inherit.js';
import arithmetic from '../../arithmetic.js';

/**
 * @constructor
 */
function ProblemModel() {

  // @public - model properties, initialized to undefined, but only ever set to {number}
  this.multiplicandProperty = new Property( undefined );
  this.multiplierProperty = new Property( undefined );
  this.productProperty = new Property( undefined ); // product of multiplication
  this.possiblePointsProperty = new Property( 1 ); // points for correct completion of current task, can go down on incorrect answers
}

arithmetic.register( 'ProblemModel', ProblemModel );

inherit( Object, ProblemModel, {

  // @public
  reset: function() {
    this.multiplicandProperty.reset();
    this.multiplierProperty.reset();
    this.productProperty.reset();
    this.possiblePointsProperty.reset();
  }
} );

export default ProblemModel;