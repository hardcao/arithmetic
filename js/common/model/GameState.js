// Copyright 2002-2014, University of Colorado Boulder

/**
 * Game states in the 'Arithmetic'.
 *
 * @author Andrey Zelenkov (Mlearner)
 * @author John Blanco
 */
define( function() {
  'use strict';

  /**                                                                                       correct answer
   *                                                             ┌───────────────────────────────────────────────────────────────────────┐
   *                                                             │                                                                       │
   *                     load saved game state                   │                                                  incorrect answer     │
   *                ┌───────────────────────────────────────────────────────────────────────────────────┐     ┌──────────────────────────┤
   *                │                                            │                                      ↓     ↓                          │
   *   SELECTING_LEVEL ┤                                            │     ┌────────────────────────> AWAITING_USER_INPUT -> EQUATION_FILLED ┘
   *        ↑       │                                            ↓     │
   *        │       └────────────────────────> LEVEL_INIT -> NEXT_TASK ┤
   *        │             init new level                               │
   *        │                                                          └────────────────────────> LEVEL_FINISHED -> SHOW_STATISTICS ┐
   *        │                                                                                                                       │
   *        └───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
   *                                                        select new level
   */

  return Object.freeze( {
    AWAITING_USER_INPUT: 'awaitingUserInput',
    DISPLAYING_CORRECT_ANSWER_FEEDBACK: 'displayingCorrectAnswerFeedback',
    EQUATION_FILLED: 'equationFilled',
    LEVEL_FINISHED: 'levelFinished',
    NEXT_TASK: 'nextTask',
    REFRESH_LEVEL: 'resetLevel',
    SELECTING_LEVEL: 'selectingLevel',
    SHOW_STATISTICS: 'showStatistics'
  } );
} );