import {
  RECEIVE_USERS,
  SAVE_USER_ANSWER,
  SAVE_USER_QUESTION
} from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return { ...state, ...action.users };
    case SAVE_USER_ANSWER:
      const { authedUser, qid, answer } = action.info;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      };
    case SAVE_USER_QUESTION:
      const { userId, questionId } = action.newUserQuestion;
      return {
        ...state,
        [userId]: {
          ...state[userId],
          questions: state[userId].questions.concat([questionId])
        }
      };

    default:
      return state;
  }
}
