import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api';
import { receiveUsers, saveUserAnswer, saveUserQuestion } from './users';
import {
  receiveQuestions,
  saveQuestionVote,
  saveQuestionNew
} from './questions';

export function handleInitialData() {
  return dispatch => {
    getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}

export function saveAnswer(info) {
  return dispatch => {
    saveQuestionAnswer(info).then(() => {
      dispatch(saveUserAnswer(info));
      dispatch(saveQuestionVote(info));
    });
  };
}

export function saveNewQuestion(question) {
  return dispatch => {
    console.log('Question: ', question);
    saveQuestion(question).then(q => {
      console.log('q: ', q);
      const newUserQuestion = {
        userId: q.author,
        questionId: q.id
      };
      dispatch(saveUserQuestion(newUserQuestion));
      dispatch(saveQuestionNew(q));
    });
  };
}
