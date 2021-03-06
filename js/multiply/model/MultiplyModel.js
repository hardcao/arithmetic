// Copyright 2014-2020, University of Colorado Boulder

/**
 * Model for multiply game in 'Arithmetic' simulation.
 *
 * @author Andrey Zelenkov (MLearner)
 * @author John Blanco
 */

import inherit from '../../../../phet-core/js/inherit.js';
import soundManager from '../../../../tambo/js/soundManager.js';
import arithmetic from '../../arithmetic.js';
import ArithmeticModel from '../../common/model/ArithmeticModel.js';
import GameState from '../../common/model/GameState.js';

/**
 * @constructor
 */
function MultiplyModel( tandem ) {
  const self = this;
  ArithmeticModel.call(
    this,
    tandem, {
      fillEquation: function() {
        self.problemModel.productProperty.set( parseInt( self.inputProperty.get(), 10 ) );
        self.submitAnswer();
      }
    }
  );
}

arithmetic.register( 'MultiplyModel', MultiplyModel );

inherit( ArithmeticModel, MultiplyModel, {

  // @public
  setUpUnansweredProblem: function() {

    // get available multiplier pair
    const multiplierPair = this.selectUnusedMultiplierPair();

    if ( multiplierPair ) {

      // reset the problem and score properties
      this.problemModel.multiplicandProperty.reset();
      this.problemModel.multiplierProperty.reset();
      this.problemModel.productProperty.reset();
      this.problemModel.possiblePointsProperty.reset();

      // set up the problem
      this.problemModel.multiplicandProperty.set( multiplierPair.multiplicand );
      this.problemModel.multiplierProperty.set( multiplierPair.multiplier );

      return true;
    }

    // All multiplier pairs have been used, so false is returned.
    return false;
  },

  /**
   * Automatically answer most of the problems.  This is useful for testing, since it can save time when evaluating
   * how the sim behaves when a user finishes answering all questions for a level.  We need to be very careful that
   * this is never available in the published sim.
   * @override
   * @protected
   */
  autoAnswer: function() {

    // make sure that sound is off, since otherwise it dings for every solved problem
    const soundState = soundManager.enabled;
    soundManager.enabled = false;

    // answer the questions
    const self = this;
    const numQuestions = this.activeLevelModel.tableSize * this.activeLevelModel.tableSize;
    const numQuestionsToAnswer = numQuestions - 1;
    console.log( 'Automatically answering', numQuestionsToAnswer, 'of', numQuestions, 'questions.' );
    _.times( numQuestionsToAnswer, function() {
      self.problemModel.productProperty.set(
        self.problemModel.multiplicandProperty.get() * self.problemModel.multiplierProperty.get()
      );
      self.activeLevelModel.currentScoreProperty.value += self.problemModel.possiblePointsProperty.get();
      self.activeLevelModel.displayScoreProperty.set( self.activeLevelModel.currentScoreProperty.get() );
      self.activeLevelModel.markCellAsUsed(
        self.problemModel.multiplicandProperty.get(),
        self.problemModel.multiplierProperty.get()
      );
      self.stateProperty.set( GameState.DISPLAYING_CORRECT_ANSWER_FEEDBACK );
      self.nextProblem();
    } );

    // restore the original sound state
    soundManager.enabled = soundState;
  }
} );

export default MultiplyModel;