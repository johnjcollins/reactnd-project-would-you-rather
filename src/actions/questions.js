export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION_VOTE = 'SAVE_QUESTION_VOTE';
export const SAVE_QUESTION_NEW = 'SAVE_QUESTION_NEW';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function saveQuestionVote(info) {
  return {
    type: SAVE_QUESTION_VOTE,
    info
  };
}

export function saveQuestionNew(question) {
  return {
    type: SAVE_QUESTION_NEW,
    question
  };
}
