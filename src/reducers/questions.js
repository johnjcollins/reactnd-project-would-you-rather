import {
  RECEIVE_QUESTIONS,
  SAVE_QUESTION_VOTE,
  SAVE_QUESTION_NEW
} from '../actions/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return { ...state, ...action.questions };
    case SAVE_QUESTION_VOTE:
      const { authedUser, qid, answer } = action.info;
      let question = {
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
          }
        }
      };

      return {
        ...state,
        ...question
      };
    case SAVE_QUESTION_NEW:
      return {
        ...state,
        [action.question.id]: action.question
      };
    default:
      return state;
  }
}
