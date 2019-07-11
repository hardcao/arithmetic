// Copyright 2014-2019, University of Colorado Boulder

/**
 * Model for multiply game in 'Arithmetic' simulation.
 *
 * @author Andrey Zelenkov (MLearner)
 * @author John Blanco
 */

define( function( require ) {
  'use strict';

  // modules
  var arithmetic = require( 'ARITHMETIC/arithmetic' );
  var ArithmeticModel = require( 'ARITHMETIC/common/model/ArithmeticModel' );
  var GameState = require( 'ARITHMETIC/common/model/GameState' );
  var inherit = require( 'PHET_CORE/inherit' );
  var soundManager = require( 'TAMBO/soundManager' );

  /**
   * @constructor
   */
  function MultiplyModel( tandem ) {
    var self = this;
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

  return inherit( ArithmeticModel, MultiplyModel, {

    // @public
    setUpUnansweredProblem: function() {

      // get available multiplier pair
      var multiplierPair = this.selectUnusedMultiplierPair();

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
      var soundState = soundManager.enabled;
      soundManager.enabled = false;

      // answer the questions
      var self = this;
      var numQuestions = this.activeLevelModel.tableSize * this.activeLevelModel.tableSize;
      var numQuestionsToAnswer = numQuestions - 1;
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
} );
