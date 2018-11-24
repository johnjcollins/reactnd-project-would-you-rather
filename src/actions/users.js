export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER';
export const SAVE_USER_QUESTION = 'SAVE_USER_QUESTION';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

export function saveUserAnswer(info) {
  return {
    type: SAVE_USER_ANSWER,
    info
  };
}

export function saveUserQuestion(newUserQuestion) {
  return {
    type: SAVE_USER_QUESTION,
    newUserQuestion
  };
}
